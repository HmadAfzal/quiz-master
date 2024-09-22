import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const leaderboard = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        pfpUrl: true,
        GameHistory: {
          select: {
            score: true,
          },
        },
      },
    });

    const filteredLeaderboard = leaderboard.filter(user => user.GameHistory.length > 0);

    const leaderboardData = filteredLeaderboard.map((user) => {
      const totalScore = user.GameHistory.reduce((acc, game) => acc + game.score, 0);
      const gamesPlayed = user.GameHistory.length;
      const avgScore = gamesPlayed > 0 ? totalScore / gamesPlayed : 0;

      return {
        id: user.id,
        username: user.username,
        profilePicture: user.pfpUrl || '',
        totalScore,
        gamesPlayed,
        avgScore: parseFloat(avgScore.toFixed(2)),
      };
    });

    leaderboardData.sort((a, b) => b.totalScore - a.totalScore);

    return new Response(JSON.stringify(leaderboardData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

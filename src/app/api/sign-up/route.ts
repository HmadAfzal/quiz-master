import prisma from '@/database/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields: username, email, and password.' }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'User with this email already exists.' }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        pfpUrl: `https://robohash.org/${username}`, 
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Registration successful. Redirecting to login.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error registering user:', error);

    return new Response(
      JSON.stringify({ success: false, message: 'An error occurred while registering the user.' }),
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/users/:id - Update user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Define as a Promise
) {
  try {
    // Await the params object before accessing properties
    const { id } = await params; 
    const userId = parseInt(id);
    
    const body = await request.json();
    const { name, email, role } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 });
  }
}

// DELETE /api/users/:id - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Define as a Promise
) {
  try {
    // Await the params object before accessing properties
    const { id } = await params;
    const userId = parseInt(id);

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}
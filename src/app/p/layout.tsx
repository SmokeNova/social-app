import { UserContextProvider } from '@/components';
import { authOptions } from '@/lib/authOptions';
import User, { IUserDB } from '@/lib/models/user.model';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const getUser = async (email: string) => {
  const user = (await User.findOne({ email })) as IUserDB;
  return user;
};

export default async function Protected({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin');
  }
  const { _id, username, email, image } = await getUser(
    session?.user?.email as string
  );

  return (
    <UserContextProvider
      id={_id.toString()}
      username={username}
      email={email}
      image={image}
    >
      {children}
    </UserContextProvider>
  );
}

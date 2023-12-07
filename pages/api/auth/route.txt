import NextAuth from 'next-auth/next';
// import { authOptions } from '../../lib/authOptions';
import { login } from '@/app/lib/firebase/service';
// import { compare } from 'bcrypt';
import bcryptjs from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: 'falentinaFebrianti',
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'username...',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password...',
        },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // console.log(username, password);
        const user: any = await login({ username });
        // console.log(user);

        return null;
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          // const passwordConfirm = await compare(password, user.password);
          const passwordConfirm = bcryptjs.compareSync(password, user.password);

          if (passwordConfirm) {
            return user;
          } else {
            return null;
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === 'credentials') {
        token.username = user.username;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      // if (token) {
      //   session.id = token.id;
      //   session.name = token.name;
      //   session.surname = token.surname;
      //   session.email = token.email;
      // }

      if ('fullname' in token) {
        session.user.fullname = token.fullname;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      if ('username' in token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
//   export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as HEAD, handler as PATCH, handler as OPTIONS };

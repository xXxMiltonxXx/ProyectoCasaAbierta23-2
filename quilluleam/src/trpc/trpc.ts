import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();
const middleWare = t.middleware;

const isAuth = middleWare(async (opts) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);

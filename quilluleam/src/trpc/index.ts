import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (( !user?.id) || !user?.email)
      throw new TRPCError({ code: "UNAUTHORIZED" });
    //verificar que el usuario este en la basew de datos  
    return{success:true}
  }),
});
export type AppRouter = typeof appRouter;

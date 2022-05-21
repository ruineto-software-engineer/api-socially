-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_followsId_fkey" FOREIGN KEY ("followsId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

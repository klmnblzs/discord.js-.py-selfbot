class ModCog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(pass_context=True)
        async def kick(self, ctx, user, *, reason=""):
            """Kicks a user. Requires permission!"""
            user = get_user(ctx.message, user)
            if user:
                try:
                    await user.kick(reason=reason)
                    return_msg = "Kicked user `{}`".format(user.mention)
                    if reason:
                        return_msg += " for reason `{}`".format(reason)
                    return_msg += "."
                    await ctx.message.edit(content=self.bot.bot_prefix + return_msg)
                except discord.Forbidden:
                    await ctx.message.edit(content=self.bot.bot_prefix + 'Could not kick user.')
            else:
                return await ctx.message.edit(content=self.bot.bot_prefix + 'Could not find user.')

    @commands.command(pass_context=True)
    async def ban(self, ctx, user, *, reason=""):
        """Bans a user. Requires permission!"""
        user = get_user(ctx.message, user)
        if user:
            try:
                await user.ban(reason=reason)
                return_msg = "Banned user `{}`".format(user.mention)
                if reason:
                    return_msg += " for reason `{}`".format(reason)
                return_msg += "."
                await ctx.message.edit(content=self.bot.bot_prefix + return_msg)
            except discord.Forbidden:
                await ctx.message.edit(content=self.bot.bot_prefix + 'Could not ban user.')
        else:
            return await ctx.message.edit(content=self.bot.bot_prefix + 'Could not find user.')

    @commands.has_permissions(manage_messages=True)
    @commands.command(pass_context=True, no_pm=True)
    async def purge(self, ctx, msgs: int, members="everyone", *, txt=None):
        """Purges the specified amount of texts."""
        await ctx.message.delete()
        member_object_list = []
        if members != "everyone":
            member_list = [x.strip() for x in members.split(",")]
            for member in member_list:
                if "@" in member:
                    member = member[3 if "!" in member else 2:-1]
                if member.isdigit():
                    member_object = ctx.guild.get_member(int(member))
                else:
                    member_object = ctx.guild.get_member_named(member)
                if not member_object:
                    return await ctx.send(self.bot.bot_prefix + "Invalid user.")
                else:
                    member_object_list.append(member_object)

        if msgs < 10000:
            async for message in ctx.message.channel.history(limit=msgs):
                try:
                    if txt:
                        if not txt.lower() in message.content.lower():
                            continue
                    if member_object_list:
                        if not message.author in member_object_list:
                            continue

                    await message.delete()
                except discord.Forbidden:
                    await ctx.send(self.bot.bot_prefix + "No permission' messages. Use {}delete instead.".format(self.bot.cmd_prefix))
        else:
            await ctx.send(self.bot.bot_prefix + 'Too many messages. Enter a number less than 10000')

def setup(bot: commands.Bot):
    bot.add_cog(ModCog(bot))

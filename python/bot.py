import discord
from discord.ext import commands
import datetime
import random
import time
import requests
import json
import git
import os
import io

TOKEN_AUTH = "NTM5MDYwMDg5MTE0NTkxMjQy.XWGU5w.cw6Bckvpb-4D32mUiVPCL85UeQU"
client = discord.Client()
bot = commands.Bot(command_prefix='sb.', description='''Dempy\'s selfbot.''', self_bot=True)

@bot.event
async def on_ready():
	print('Bot is running. I am listening to your commands, commander!')

@bot.event
async def on_message_delete(message):
	if message.channel.type == discord.ChannelType.private:
		msgtime = message.created_at.now()
		channel = bot.get_channel(616295589012963349)
		embed = discord.Embed(title='Delete log', color=0xa12a2a)
		embed.add_field(name='{} Deleted a message:'.format(message.author), value=message.content)
		embed.set_footer(text=msgtime)
		await channel.send(embed=embed)

@bot.event
async def on_message_edit(message, after):
	if message.channel.type == discord.ChannelType.private:
		msgtime = message.created_at.now()
		channel = bot.get_channel(616295589012963349)
		embed = discord.Embed(title='Edit log; sent by {}'.format(message.author), color=0xa12a2a)
		embed.add_field(name='Before:', value=message.content)
		embed.add_field(name='After:', value=after.content)
		embed.set_footer(text=msgtime)
		await channel.send(embed=embed)

@bot.command()
async def embed(ctx, *, text):
	await ctx.message.delete()
	embed = discord.Embed(title='Embed sent by {}'.format(ctx.message.author), color=0xa2ebe3)
	embed.add_field(name='Message:', value=text)
	await ctx.send(embed=embed)

@bot.command()
async def coinflip(ctx):
	await ctx.message.delete()
	author = ctx.message.author
	possible = ['Head', 'Tails']
	choose = random.choices(possible)
	fix_choose = ''.join(choose)

	embed = discord.Embed(title='{}\'s coinflip!'.format(author), color=0xa2ebe3)
	embed.add_field(name='Result:', value=fix_choose)
	await ctx.send(embed=embed)

@bot.command()
async def roll(ctx):
	await ctx.message.delete()
	author = ctx.message.author
	numbers = random.randint(1, 6)

	embed = discord.Embed(title='{} rolled! :game_die:'.format(author), color=0xa2ebe3)
	embed.add_field(name='Roll value:', value=numbers)
	await ctx.send(embed=embed)

@bot.command()
async def ping(ctx):
	await ctx.message.delete()
	msgtime = ctx.message.created_at.now()
	await (await bot.ws.ping())
	now = datetime.datetime.now()
	ping = now - msgtime
	pong = discord.Embed(title='Pong! Response Time:', description=str(ping.microseconds / 1000.0) + ' ms', color=0x7A0000)
	pong.set_thumbnail(url='http://odysseedupixel.fr/wp-content/gallery/pong/pong.jpg')
	await ctx.send(content=None, embed=pong)

bot.run(TOKEN_AUTH, bot=False)

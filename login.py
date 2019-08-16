import collections
import datetime
import math
import json
import subprocess
import asyncio
import random
import glob
import gc
import psutil
import sys
import re
import traceback
import argparse
import os
import logging
import requests
import logging.handlers
import discord
import aiohttp
import discord
import requests
import io
import re
import urllib.parse
from bs4 import BeautifulSoup
from json import load, dump
from datetime import timezone
from collections import namedtuple
from discord.ext import commands

TOKEN_AUTH = "authentication token"

bot = commands.Bot(command_prefix='prefix')
client = discord.Client()

@client.event
async def on_ready():

	print(client.guilds)
	print('I am ready to serve, commander!')

bot.load_extension("cogs.moderation")
	
client.run(TOKEN_AUTH, bot=False)

import discord
from discord import app_commands
from os import getenv

from motor import motor_asyncio as motor

bot = discord.Client(intents=discord.Intents.all())
bot.tree = app_commands.CommandTree(bot)

@bot.event
async def on_ready():
  await bot.tree.sync()
  print(f"Logged in as {bot.user}")

@bot.event
async def on_message(message: discord.Message):
  if message.author.bot:
    return
  if not message.content.startswith('<#'):
    return
  cont = message.content.split('\n', 1)
  if len(cont) <= 1:
    return
  channels = geneCon(cont[0])
  for c in channels:
    channel = bot.get_channel(int(c))
    if not channel:
      continue
    await channel.send(cont[1])
  return

def geneCon(tempCon: str):
  con = tempCon.split(' ')
  channels = []
  for c in con:
    if not c.startswith('<#'):
      continue
    if not c.endswith('>'):
      continue
    cID = c[2:-1]
    channels.append(int(cID))
  return channels


token = getenv('DISCORD_BOT_TOKEN')
bot.run(token)

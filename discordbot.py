from ast import If, List, Return
import discord
from discord import app_commands
from os import getenv

from sqlalchemy import true
from motor import motor_asyncio as motor

bot = discord.Client(intents=discord.Intents.all())
bot.tree = app_commands.CommandTree(bot)

Mongo_USER = getenv('MONGO_USER')
Mongo_pass = getenv('MONGO_PASS')
dbclient = motor.AsyncIOMotorClient(f"mongodb+srv://{Mongo_USER}:{Mongo_pass}@cluster0.kg9vt.mongodb.net/HashHash?retryWrites=true&w=majority")
db = dbclient["ProfileBot"]
permission_collection = db.perm

@bot.event
async def on_ready():
  await bot.tree.sync()
  print(f"Logged in as {bot.user}")

@bot.event
async def on_message(message: discord.Message):
  if message.author.bot: return
  if not message.content.startswith('<#'): return
  cont = message.content.split('\n', 1)
  if len(cont) <= 1: return
  channels = geneCon(cont[0])
  for c in channels:
    permissionChannel = await permission_collection.find_one({
      "guildID": message.guild.id,
      "channelID": c
    }, {
        "_id": False
    })
    if not permissionChannel:
      continue
    channel = bot.get_channel(int(c))
    if not channel: continue
    await channel.send(cont[1])
  return

def geneCon(tempCon: str):
  con: List = tempCon.split(' ')
  channels: List = []
  for c in con:
    if not c.startswith('<#'): continue
    if not c.endswith('>'): continue
    cID = c[2:-1]
    channels.append(int(cID))
  return channels


@bot.tree.command()
async def add(interaction: discord.Interaction, Channel: discord.TextChannel):
  if not interaction.user.guild_permissions.manage_channels: return
  permissionChannel = await permission_collection.find_one({
    "guildID": interaction.guild_id,
    "channelID": Channel.id
  }, {
      "_id": False
  })
  if permissionChannel:
    await interaction.response.send_message(f'{Channel.mention} は既に登録されています。', ephemral=True)
    return
  await permission_collection.insert_one({
    "guildID": interaction.guild_id,
    "channelID": Channel.id
  })
  await interaction.response.send_message(f'{Channel.mention} が対象に追加されました。', ephemral=True)
  return

@bot.tree.command()
async def remove(interaction: discord.Interaction, Channel: discord.TextChannel):
  if not interaction.user.guild_permissions.manage_channels: return
  result = await permission_collection.delete_one({
    "guildID": interaction.guild_id,
    "channelID": Channel.id
  })
  if result.deleted_count == 0:
    await interaction.response.send_message('対象に存在しません。', ephemral=True)
    return
  await interaction.response.send_message(f"{Channel.mention} が対象から削除されました。", ephemral=True)
  return

token = getenv('DISCORD_BOT_TOKEN')
bot.run(token)

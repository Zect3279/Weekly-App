import discord
from discord import app_commands
from os import getenv

import requests
from bs4 import BeautifulSoup

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
  if not message.content.startswith('/'):
    return
  if message.content.startswith('/poly'):
    con = message.content.split(' ')
    res = findPNFT(con[1])
    print(res)
    await message.channel.send(res['address'])
    await message.channel.send(res['id'])
    return
  if message.content.startswith('/eth'):
    con = message.content.split(' ')
    res = findENFT(con[1])
    print(res)
    await message.channel.send(res['address'])
    await message.channel.send(res['id'])
    return
  return

def findPNFT(id):
  url1 = f'https://polygonscan.com/address-erc721tokenpage?m=normal&a={id}'
  r = requests.get(url1)
  soup1 = BeautifulSoup(r.content, "html.parser")
  elems = soup1.select('#body > div.table-responsive > table > tbody > tr:nth-of-type(1) > td:nth-of-type(8) > a')
  url2 = elems[0].attrs['href']
  r = requests.get(f'https://polygonscan.com/{url2}')
  soup2 = BeautifulSoup(r.content, "html.parser")
  id = soup2.select('#ContentPlaceHolder1_divSummary > div.row.mb-4 > div.col-md-6.mb-3.mb-md-0 > div > div.card-body > div.row.align-items-center > div.col-md-8.font-weight-medium > b')[0].contents[0]
  address = soup2.select('#ContentPlaceHolder1_divSummary > div.row.mb-4 > div:nth-of-type(2) > div > div.card-body > div.row.align-items-center > div.col-md-8 > div > a.text-truncate.d-block.mr-2')[0].contents[0]
  return {'address':address, 'id':id}

def findENFT(id):
  id = f'https://blockscout.com/xdai/mainnet/address/{id}/token-transfers'
  address = '0x22C1f6050E56d2876009903609a2cC3fEf83B415'
  return {'address':address, 'id':id}


token = getenv('DISCORD_BOT_TOKEN')
bot.run(token)

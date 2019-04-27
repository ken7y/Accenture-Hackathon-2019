#!/usr/local/bin/python3

import hashlib as sha
import datetime as time

class Block:
	def __init__(self, time, smart_contract, money, previous_block):
		self.time = time
		self.smart_contract = self.generate_smart_contract(money)
		self.previous_block = previous_block
		self.encode = self.hash_block()

	def generate_smart_contract(self, money):
		

	def hash_block(self):
		block = sha.sha256(str(self.time) + str(self.smart_contract) + str(self.previous_block)).hexdigest()
		return block

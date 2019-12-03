# ---------------------------------------------------------------------------
'''
	TODO:
		[ ] figure out how to run script from button press on website
		[ ] think of anything else to scrape
		[ ] think of how to handle multiple url's in terms of running the script once...
'''
# ------------------------------------------------------------------------------

# actually request the html page
import requests
import requests.exceptions

# for parsing the html
from bs4 import BeautifulSoup

# for text analysis
import nltk

import matplotlib.pyplot as plt

# to turn the data into JSON
import json

# for encoding/decoding the requested html page
import codecs

# so i can handle the command line arguments required for running the script once
import sys

import pprint

# ------------------------------------------------------------------------------

def get_url_data(url):
	success = False
	page = None
	message = ''
	try:
		# timeout tuple in case we have issues gathering the site data
		page = requests.get(url, timeout=(5, 5)) # set to 5 currently...
		# if the response was successful, no Exception will be raised
		page.raise_for_status()
	except requests.exceptions.RequestException as e:
		message = 'Error occurred: {}'.format(e)
		return success, page, message
	else:
		success = True
		return success, page, message

# ------------------------------------------------------------------------------

def page_to_soup(page):
	html_page = page.text
	soup = BeautifulSoup(html_page, features="lxml")
	return soup

# ------------------------------------------------------------------------------

def get_char_set(soup):
	metas = list()
	# one of the metas will contain this charset attribute
	for meta in soup.findAll('meta', charset=True):
		metas.append(str(meta['charset']))
	# default case if a charset isn't found
	if len(metas) == 0:
		return'utf-8'
	return metas[0].lower()

# ------------------------------------------------------------------------------

def get_description(soup):
	metas = list()
	# default case if a description isn't found
	description = "No Description Found."
	for meta in soup.findAll('meta'):
		if meta.get("name", None) == "description":
			description = meta.get("content", None)
	return description

# ------------------------------------------------------------------------------

def sort_dict(d):
	# sorts a dict based on key values
	sorted_dict = list()
	for w in sorted(d, key=d.get, reverse=True):
		sorted_dict.append((w, d[w]))
	return sorted_dict
# ------------------------------------------------------------------------------

def text_analysis(word_dict, pos_dict, text):
	# tags we don't want to collect data for
	BLACKLIST_POS = ['.']

	tokens = nltk.word_tokenize(text)
	for word in tokens:
		pos = nltk.pos_tag([word], tagset='universal')
		pos_str = str(pos[0][1])

		if pos_str not in BLACKLIST_POS:
			if word not in word_dict.keys():
				word_dict[word] = 1
			else:
				word_dict[word] += 1

			if pos_str not in pos_dict.keys():
				pos_dict[pos_str] = 1
			else:
				pos_dict[pos_str] += 1

	return word_dict, pos_dict


# ------------------------------------------------------------------------------

def remove_garbage(s):
	# to clean the tag text
	stripped = lambda x: "".join(i for i in s if 31 < ord(i))
	s = stripped(s)
	return s
# ------------------------------------------------------------------------------

def get_tag_data(urls):
	# tags we don't want to collect data for
	BLACKLIST_TAGS = []
	TEXT_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'a', 'li', 'th', 'td', 'q', 'i', 'strong', 'button', 'time']

	json_dict = dict()
	i = 1

	if isinstance(urls, list):
		urls = urls
	else:
		urls = [urls]

	for url in urls:
		url_text = 'url_' + str(i)
#		print(url_text)

		success, page, message = get_url_data(url)
		tag_dict = dict()
		text_dict = dict()
		pos_dict = dict()
		text_analysis_dict = dict()
		meta_data_dict = dict()
		data_dict = dict()
		error_dict = dict()

		tag_list = list()
		text_list = list()
		pos_list = list()
		if success:
			# declaring all of the dicts and lists I'll need to store the data


			# changing the page into soup so i can interact with the page
			soup = page_to_soup(page)
			tags = soup.findAll()

			# get some metadata about the site
			Description = get_description(soup)
			Encoding = get_char_set(soup)

			last = ''
			for tag in tags:
				if tag.name not in BLACKLIST_TAGS:
					if tag.name in TEXT_TAGS:
						s = tag.get_text()
						if (len(s) > 0) and ((s not in last) or (last not in s)):
							# replace garbage characters ---> must make this function
							s = remove_garbage(s)
							# tokens = nltk.word_tokenize(s)
							text_dict, pos_dict = text_analysis(text_dict, pos_dict, s)
						last = s
					if tag.name not in tag_dict.keys():
						tag_dict[tag.name] = 1
					else:
						tag_dict[tag.name] += 1
				else:
					continue
			# changing all of the data to JSON
			text_list = sort_dict(text_dict)
			pos_list = sort_dict(pos_dict)
			tag_list = sort_dict(tag_dict)

			text_analysis_dict['text'] = text_list
			text_analysis_dict['pos'] = pos_list

			meta_data_dict['encoding'] = Encoding
			meta_data_dict['description'] = Description
			meta_data_dict['url'] = url

			data_dict['meta'] = meta_data_dict
			data_dict['text_analysis'] = text_analysis_dict
			data_dict['tag_analysis'] = tag_list
			data_dict['error'] = None

			json_dict[url_text] = data_dict
		else:
			data_dict['meta'] = None
			data_dict['text_analysis'] = None
			data_dict['tag_analysis'] = None
			data_dict['error'] = message
			json_dict[url_text] = data_dict
		i += 1


	return json.dumps(json_dict, indent=2, sort_keys=True)

# ------------------------------------------------------------------------------

def main():
	urls = []
	n = len(sys.argv)

	for i in range(1, n):
		urls.append(sys.argv[i])
#	print(urls)

#	get_tag_data(urls)
	print(get_tag_data(urls))
	

# ------------------------------------------------------------------------------

if __name__ == "__main__":
	main()

# ------------------------------------------------------------------------------

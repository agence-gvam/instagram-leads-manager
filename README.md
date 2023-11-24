# Instagram Leads Manager

## Presentation

I created this projet to help me inventory all leads from Instagram.

Before, I used to send all leads profile in a conversation with another of my accounts. The problem is that I couldn't know if I already added a lead in the conversation.

This idea is to add each potential lead in a database, and then count them to know how many they are.

## How to use it ?

To use this project, you need to run it on Node JS 18.18.0 (maybe less but this is the version I use to build it).
You also need to add a .env file in the config folder. The file will require all these variables:

- PORT : one that is not used yet (I used to use port between 5000 and 6000).
- DB_CONNECT: a MongoDb connect link (for example: mongodb+srv://"user"@"password"."cluster name".mongodb.net/"database name")
- USERNAME : anything you want as username
- PASSWORD: anything you want as password
- COOKIE : Any string you want. This is the cookie value that will be set in the navigator after being logged in.

## Future features ?

Yes. There will likely be other features in this tool, allowing you to manage leads more effectively.

# Discord-Bot
My first project on Discord bot using node.js v14. In this project, I'll tell you how to make a Discord Bot, using Node.js for the Beginner.

> [!NOTE]
> Some code **may** not work properly in future as the update comes. So please make sure to check codes and updates from official sites. Also, keep in mind that I'm using Visual Studio Code for this project. If you want to use external application such as [replit.com](https://replit.com/), etc. you can ignore some of these steps from here. But I suggest you to start your project in `Visual Studio Code` only.

# Steps to setup your Visual Studio Code.
Here are the steps to setup your `Visual Studio` Code for bot making.
- Download/Update your [Visual Studio Code](https://code.visualstudio.com).
- Download [Node.js](https://nodejs.org/en).
- Install your Node.js after downloading it.
- Create a folder in your files and name it anything you like.
- Then open your folder using `Visual Studio Code`

> [!TIP]
> You can open your folder directly in `Visual Studio Code`

- Now open your `Terminal of your Visual Studio Code`.

![Terminal](https://cdn.discordapp.com/attachments/889119613332381696/1308723151257206825/image.png?ex=673efaea&is=673da96a&hm=c35f9092b7e3e82d03ef025c4198d0b1bdb04d1a2ee0eccb41411313b337892c&)

- Now inside `Terminal`, type `npm init` and then press Enter.
- Then you will see something like in the following image. After that, press Enter again and then after that you can type `clear` in `Terminal` to remove all logs from the `Terminal`.

![Screenshot](https://cdn.discordapp.com/attachments/889119613332381696/1308725824454787072/image.png?ex=67595b67&is=675809e7&hm=b1e9c871192949fa2343f110c6a7f7a1f8ac1d7bcec50b08be6c5081dd2dd028&)

- After this, you will able to see a file called `package.json` in your Explorer. It will just have the information of your software and all that are required for your Bot making.
- Now get to `Terminal` again and then type `npm install discord.js` to get all the libraries from Discord themselves. After this, you will see another file appears called `package-lock.json` and a folder called `node_module` in your Explorer.

> [!WARNING]
> Do not make any changes in any of these files or folders unless you know what you are doing. It's better to leave those files untouched at all.

- After that i suggest you to get ESLint library as a development dependency in your Node.js project. To get that, go to `Terminal` again and type `npm --save-dev eslint`.
- Now the last command you need to type in `Terminal` is `npm install dotenv`. This is very essential command since you need your Discord bot Token or any other secret values to be stored in a file and use their values.

### Now here you go. Your `Visual Studio Code` is now ready for your Discord bot Development. Hope you find this helpful for your Discord bot Project!

I will be uploading some files here too, so that you can make for your bot. Some of them are necessary and some may not. So go through files and read their description to find out if you need those.

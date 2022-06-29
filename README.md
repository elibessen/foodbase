<h1 align="center">Food ordering system</h1>
<h3 align="center">A self-hostable system for Food Tech classes using Firebase Auth & Firestore</h3>

<p align="center">
  <strong>
    <a href="https://github.com/users/LCordial/projects/3">Project Board</a>
  </strong>
</p>

<div align="center">
<img src="https://img.shields.io/github/license/LCordial/food-ordering-system"> <img src="https://img.shields.io/github/issues/LCordial/food-ordering-system">
</div>

## Overview

- **Secure, reliable authentication.** Login using your email and password without worrying about any leaks.
- **Always running.** Once the app is running, it never stops. Thats a Firebase guarantee. (Unless you stop it).
- **Modern interface.** Always using the latest Bootstrap version to create a sleek, modern and responsive experience.
- **Seperate teacher interface.** Teachers can see each students order and edit them individually or see an overview of every order.
- **Easy to understand.** No training, no prior-knowledge, nothing. 

## Requirements
- Firebase project with Auth, Firestore database and Hosting enabled. However, it is already enabled within this project.
- Domain. 

or if you want edit the code directly:

- Visual Studio Code.
- Firebase tools (=> 11.1.0).
- Bootstrap (5.2.0-beta1).

## Installation and usage
1. Clone the project:
```git
git clone https://github.com/LCordial/food-ordering-system.git
```
2. Create Firebase project and make it a web app.
3. Create `config.js` file in `public` folder:
```js
const firebaseConfig = {
// Your firebase config
}
firebase.initializeApp(firebaseConfig);
```
4. Connect Firebase Hosting to your domain.
5. Once all the accounts are created, run `firebase deploy`

If there are any issues, use [the issue page](https://github.com/LCordial/food-ordering-system/issues).

## License
Copyright (c) 2022 Eli B, Phoenexus22

Licensed under the [MIT License](https://github.com/LCordial/food-ordering-system/blob/main/LICENSE.md).

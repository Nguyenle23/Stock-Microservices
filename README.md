# Stocking-Microservices-Project
> The project for Net-Centric Programming Course.

# Introduction
<h4>Member</h4>

| Number | ID | Name |
| ----- | ----- | --------- |
| 1 | ITITIU19169 | Le Nguyen Binh Nguyen |
| 2 | ITITIU19217 | Tran Ngoc Tien |

<h4>Motivation</h4> 
<p>Our team want to apply the knowledge learned from the course to create an application that can use Socket to communcicate between each services and also to order stocking in real-time</p>

<h4>Present slides: <a href="https://www.canva.com/design/DAFjvH0sgTM/or3u9AjEydGnUNooIFiSfg/view"> here </a> </h4>

<h2 id="table-of-contents"> :book: Table of Contents</h2>
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#general-information">General Information</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#folder-structure">Folder Structure</a></li>
    <li><a href="#screenshot">Screenshot</a></li>
    <li><a href="#acknowledge">Acknowledge</a></li>
  </ol>
</details>

<h2 id="general-information"> 🧮 General Information</h2>

- **Client** : ReactJS for Login, Register, Dashboard to order stock
- **Server** : GoFiber, Loopback framework to operate application

<h2 id="features"> 📋 Features</h2>

List the ready features here:

| ---- | Feature |
| ------ | ------ |
| Client | Login, Register, Order stock |
| Server | CRUD Users, Authentication, Handling order |


<h2 id="technologies"> 🖥️ Technologies</h2>

### 1. Client
| Plugin | README |
| ------ | ------ |
| Vite | https://github.com/vitejs/vite |

### 2. Server
| Plugin | README |
| ------ | ------ |
| GoFiber | https://github.com/gofiber/fiber |
| Loopback | https://github.com/loopbackio/loopback-next |

### 3. Database
| Plugin | README |
| ------ | ------ |
| Go-gorm | https://github.com/go-gorm/gorm |

<!-- FOLDER STRUCTURE -->
<h2 id="folder-structure"> 🗺️ Folder Structure</h2>
   
    ├── client
    │   ├── src
    │   │   ├── actions
    │   │   ├── components
    │   │   ├── App.tsx
    │   │   ├── main.js
   
    ├── server
    │   ├── cmd
    │   ├── controllers
    │   ├── services
    │   ├── repositories
    │   ├── middlewares
    │   ├── models
    │   ├── routes
  
<h3> Sequence diagram </h3> 
<img src="https://res.cloudinary.com/nguyenle23/image/upload/v1684867231/netcentric/sd_rqx1rl.png" alt="Sequence-diagram">

<h2 id="screenshot"> 📸 Screenshots </h2>

### Client

<img src="https://res.cloudinary.com/nguyenle23/image/upload/v1684867231/netcentric/login_lgtnxe.png" alt="login">
<img src="https://res.cloudinary.com/nguyenle23/image/upload/v1684867232/netcentric/register_jwpt61.png" alt="register">

<h2 id="acknowledge"> 💼 Acknowledgement </h2>

### What We Learnt
- Implementation of developing webserver
- Usage of socket in real-time application
- Communication between Frontend and Backend developers
- Importance of README.md documents 

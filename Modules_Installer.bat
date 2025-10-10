@echo off
title Modules Installer - EmpreendaCADC
echo Welcome to the Modules Installer for EmpreendaCADC!
echo [1] Client Modules [2] Server Modules


set /p UserInput=What do you prefer to install first?

set /a NumberCheck=%UserInput% + 0 2>nul

if "%UserInput%" == "" (
    echo No input.
) else if "%NumberCheck%" == "0" if not "%UserInput%" == "0" (
    echo Invalid input. Please enter a number.
)

 if "%NumberCheck%" == "1" (
    cd client
    npm install
    echo Client modules successfully installed!
    pause

)

    if "%NumberCheck%" == "2" (
    cd server
    npm i mongoose dotenv resend stripe bcryptjs jsonwebtoken multer express cors cookie-parser morgan helmet
    echo All Server modules successfully installed!
    pause
) else (
    echo Invalid input. Please enter 1 or 2.
    pause
)
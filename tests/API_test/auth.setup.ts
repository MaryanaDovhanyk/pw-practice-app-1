import {test as setup} from '@playwright/test';
import user from 'C:/Playwrite_js/pw-practice-app/.auth/user.json';
import fs from 'fs';

const authFile = '.auth/user.json'

setup('authentication', async({page, request}) => {
    //commenting UI authentication

    //await page.goto('https://conduit.bondaracademy.com/')
    // await page.getByText('Sign in').click()
    // await page.getByRole('textbox', {name: 'Email'}).fill('asde7898@gmail.com')
    // await page.getByRole('textbox', {name: 'Password'}).fill('Welcome1')
    // await page.getByRole('button').click() 
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    // await page.context().storageState({path: authFile})

    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            user: {
                email: "asde7898@gmail.com", 
                password: "Welcome1"
            }
        }
    })
    const responceBody = await response.json()
    const accessToken = responceBody.user.token
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))

    process.env['ACCESS_TOKEN'] = accessToken
})
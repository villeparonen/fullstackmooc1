describe('Blogs ', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test User',
            username: 'testuser1',
            password: 'testuser2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('blog')
        cy.contains('Blog app, Ville Paronen, Fullstack open course 2020')
    })

    // 5.17: blogilistan end to end -testit, step1
    // Tee testi, joka varmistaa, että sovellus näyttää oletusarvoisesati kirjautumislomakkeen.
    // login nappia täytyy painaa, jotta kirjautumislomake tulee esiin. Testi epäonnistuu ilman login klikkausta
    it('Login form is shown', function () {
        cy.contains('login').click()
        cy.get('#username').type('test')
        cy.get('#password').type('test')
    })

    // 5.18: blogilistan end to end -testit, step2
    // Kirjautumisen epäonnistumisen testaus
    // Bonustehtävä: Notifikaatio näytetään punaisella
    it('login fails with wrong password', function () {
        cy.contains('login').click()
        cy.get('#username').type('wronguser')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()
        cy.get('.error').contains('wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('html').should('not.contain', 'wronguser logged in')
    })
    // 5.18
    // Onnistuneen kirjautumisen testaus
    // Kirjautumisen onnistuessa logout nappi tulee esiin ja sitä voi klikata
    it('User can log in', function () {
        cy.contains('login').click()
        cy.get('#username').type('testuser1')
        cy.get('#password').type('testuser2')
        cy.get('#login-button').click()
        cy.contains('Logout by licking this').click()
    })

    // Tests that are done when logged in..
    describe('Logged in ', function () {
        beforeEach(function () {
            cy.visit('http://localhost:3000')
            cy.contains('login').click()
            cy.get('#username').type('testuser1')
            cy.get('#password').type('testuser2')
            cy.get('#login-button').click()
            cy.contains('Logout by licking this')
        })
        // 5.19: blogilistan end to end -testit, step3
        // Tee testi, joka varmistaa, että kirjautunut käyttäjä pystyy luomaan blogin
        // Testin tulee varmistaa, että luotu blogi tulee näkyville blogien listalle.
        it('a new blogpost can be created when logged in', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('cypress author')
            cy.get('#url').type('www.cypress.fi')
            cy.contains('Create').click()
            cy.contains('a blog created by cypress')
        })



        describe('Blogpost created ', function () {
            beforeEach(function () {
                cy.contains('new blog').click()
                cy.get('#title').type('a blog created by cypress')
                cy.get('#author').type('cypress author')
                cy.get('#url').type('www.cypress.fi')
                cy.contains('Create').click()
                cy.contains('a blog created by cypress')
            })

            // 5.20: blogilistan end to end -testit, step4
            // Tee testi, joka varmistaa, että blogia voi likettää.
            // Liken arvo muuttuu 0 -> 1
            it('give like to new blogpost', function () {
                cy.contains('View').click()
                cy.get('.likesButton').click().then(d => {
                    cy.get('.likes').contains('1')
                })
            })

            // 5.21: blogilistan end to end -testit, step5
            // Tee testi, joka varmistaa, että blogin lisännyt käyttäjä voi poistaa blogin.
            it('remove new blogpost if logged in with correct user', function () {
                cy.contains('View').click()
                cy.contains('remove').click()
                cy.contains('Selected item removed from list and whole list sorted to ascending likes order again')
            })
            // Bonus: varmista myös että poisto ei onnistu muilta kuin blogin lisänneeltä käyttäjältä.
            // Kirjaudutaan ulos ja kokeillaan poistaa blogi - ei pitäisi onnistua
            it('removing blogpost fails when logged out', function () {
                cy.contains('Logout by licking this').click()
                cy.contains('View').click()
                cy.contains('remove').click()
                cy.contains('Error: Request failed with status code 401')
            })


            // 5.22: blogilistan end to end -testit, step6
            // Luodaan muutamia uusia blogeja
            describe('Create multiple blogposts and test their order ', function () {
                beforeEach(function () {
                    // Give likes to blogpost that was created first before. Without ordering this first blogpost should be seen last. 
                    // But because it has now more likes, it should be shown first
                    cy.contains('View').click()
                    cy.get('.likesButton').click()
                    cy.get('.likesButton').click()
                    cy.get('.likesButton').click()
                    cy.get('.likesButton').click()

                    cy.contains('new blog').click()
                    cy.get('#title').type('a blog created by cypress 2')
                    cy.get('#author').type('cypress author 2')
                    cy.get('#url').type('www.cypress2.fi')
                    cy.contains('Create').click()
                    cy.contains('a blog created by cypress')

                    cy.contains('new blog').click()
                    cy.get('#title').type('a blog created by cypress 3')
                    cy.get('#author').type('cypress author 3')
                    cy.get('#url').type('www.cypress3.fi')
                    cy.contains('Create').click()
                    cy.contains('a blog created by cypress')

                    cy.contains('new blog').click()
                    cy.get('#title').type('a blog created by cypress 4')
                    cy.get('#author').type('cypress author 4')
                    cy.get('#url').type('www.cypress4.fi')
                    cy.contains('Create').click()
                    cy.contains('a blog created by cypress')
                })

                it('Test order by likes', function () {
                    cy.visit('http://localhost:3000')
                    cy.get('b:first').contains('a blog created by cypress')
                })
            })

        })
    })
})
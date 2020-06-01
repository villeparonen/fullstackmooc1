import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import increaseLike from '../App'

// 5.13: blogilistan testit, step1
// Tee testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen, authorin mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.
test('Renders title and author and check that display is none when it is not yet clicked', () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'www.url.fi',
        likes: 29
    }

    const component = render(
        <Blog blog={blog} />
    )

    component.debug()

    // Check that display is none before clicking button. 
    let test_click = component.container.querySelector('.hiddenBlog')
    // console.log(test_click.style._values.display)
    expect(test_click.style._values.display).toBe('none')
    //

    expect(component.container).toHaveTextContent('Test Title')
    expect(component.container).toHaveTextContent('Test Author')
    // expect(component.container).toHaveTextContent('www.url.fi')
    // expect(component.container).toHaveTextContent('29')
})

// 5.14: blogilistan testit, step2
// Tee testi, joka varmistaa että myös url ja likejen määrä näytetään kun blogin kaikki tiedot näyttävää nappia on painettu.
test('Renders title, author, url and likes and check that display is undefined (values shown) when button is clicked', () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'www.url.fi',
        likes: 29
    }

    const component = render(
        <Blog blog={blog} />
    )

    // Check that display is none before clicking button. 
    let test_click = component.container.querySelector('.hiddenBlog')
    console.log(test_click.style._values.display)
    expect(test_click.style._values.display).toBe('none')
    //

    const button4 = component.getByText('View')
    fireEvent.click(button4)
    // Clicking the button switch style="display: none;"  -> style="display: ''"

    // Check that display is undefined after clicking the button
    let test_click2 = component.container.querySelector('.hiddenBlog')
    // console.log(test_click2.style._values.display)
    expect(test_click2.style._values.display).toBe(undefined)
    //

    expect(component.container).toHaveTextContent('Test Title')
    expect(component.container).toHaveTextContent('Test Author')
    expect(component.container).toHaveTextContent('www.url.fi')
    expect(component.container).toHaveTextContent('29')
})


// 5.15: blogilistan testit, step3
// Tee testi, joka varmistaa, että jos komponentin like-nappia painetaan kahdesti, komponentin propsina saamaa tapahtumankäsittelijäfunktiota kutsutaan kaksi kertaa.
test('cliks the view button once', () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'www.url.fi',
        likes: 29,
        id: 5
    }

    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} increaseLike={() => mockHandler()} />
    )

    const button4 = component.getByText('View')
    fireEvent.click(button4)
    const button5 = component.getByText('like')
    fireEvent.click(button5)
    fireEvent.click(button5)

    expect(mockHandler.mock.calls).toHaveLength(2)
    // console.log(mockHandler.mock.calls)
})
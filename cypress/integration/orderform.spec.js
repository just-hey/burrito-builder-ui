describe('App', () => {

  beforeEach(() => {
    cy.fixture('orders')
      .then(( data ) => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
          statusCode: 200,
          body: data,
        })
      })
    cy.fixture('postorder')
      .then(( data ) => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
          statusCode: 200,
          body: data,
        }).as('post')      
      })
    cy.visit('http://localhost:3000')
  })

  it('should allow a user to enter their name for the order', () => {
    cy.get('input[name="name"]')
      .should('have.value', '')
    cy.get('input[name="name"]')
      .type('Bob')
      .should('have.value', 'Bob')
  })

  it('should allow a user to select ingredients for their burrito', () => {
    cy.get('form')
      .find('p')
      .should('have.text', 'Order: Nothing selected')
    cy.get('button')
      .contains('guacamole')
      .click()
    cy.get('form').find('p')
      .should('have.text', 'Order: guacamole')
  })

  it('should allow a user to submit their order if the inputs are filled out', () => {
    cy.get('input[name="name"]')
      .type('Bob')
      .should('have.value', 'Bob')
    cy.get('button')
      .contains('beans')
      .click()
    cy.get('button')
      .contains('Submit Order')
      .click()
    cy.wait('@post')
      .its('response.body')
      .then(({orders}) => {
      cy.expect(orders[0].name).to.deep.equal('Bob')
    })
  })
  
})

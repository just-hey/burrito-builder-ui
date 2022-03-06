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
  
})

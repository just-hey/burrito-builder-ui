describe('App', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display titles', () => {
    cy.get('h1')
      .should('contain','Burrito Builder')
  })

  it('should allow a user to see prepopulted orders on render', () => {
    cy.get('.order')
      .contains('Pat')
  })
  
})

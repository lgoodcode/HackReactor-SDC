import { config as dotenv } from 'dotenv'
import request from 'supertest'
import app from '../app'
import results from './mocks/results'

// Need to actually use the database to determine if the query is correct
dotenv()

// Skip this test suite that uses the real database if the CI environment variable is set to true
const maybe = process.env.CI === 'true' ? describe.skip : describe

maybe('Products API - Real DB', () => {
  describe('GET /products', () => {
    it('should return the default count of the first 5 products', async () => {
      await request(app)
        .get('/api/products')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(results.getProducts)
        })
    })

    it('should return the second page of default count of 5 products', async () => {
      await request(app)
        .get('/api/products?page=2')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(results.getProductsPage2)
        })
    })

    it('should return the first 10 products', async () => {
      await request(app)
        .get('/api/products?count=10')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(results.getProductsCount10)
        })
    })
  })

  describe('GET /products/:id', () => {
    it("should return status 400 if the id is not valid or doesn't exist", async () => {
      await request(app)
        .get('/api/products/test')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })

      await request(app)
        .get('/api/products/0')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })

    it('should return the product details for the given id', async () => {
      await request(app)
        .get('/api/products/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(results.getProductDetails)
        })
    })
  })

  describe('GET /products/:id/styles', () => {
    it("should return status 400 if the id is not valid or doesn't exist", async () => {
      await request(app)
        .get('/api/products/test')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })

      await request(app)
        .get('/api/products/0')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })

    it('should return the product styles for the given id', async () => {
      await request(app)
        .get('/api/products/1/styles')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(results.getProductStyles)
        })
    })
  })

  describe('GET /products/:id/related', () => {
    it("should return status 400 if the id is not valid or doesn't exist", async () => {
      await request(app)
        .get('/api/products/test')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })

      await request(app)
        .get('/api/products/0')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('error')
        })
    })

    it('should return an array of the related product ids', async () => {
      await request(app)
        .get('/api/products/1/related')
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(results.getRelatedProducts)
        })
    })
  })
})

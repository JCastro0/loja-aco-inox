import { medusaIntegrationTestRunner } from '@medusajs/test-utils'
import { Modules } from '@medusajs/framework/utils'

jest.setTimeout(60 * 1000)

medusaIntegrationTestRunner({
  inApp: true,
  env: {},
  testSuite: ({ api, getContainer }) => {
    describe('GET /store/products', () => {
      it('lista os produtos publicados do canal associado à chave', async () => {
        const container = getContainer()

        const salesChannelService = container.resolve(Modules.SALES_CHANNEL)
        const apiKeyService = container.resolve(Modules.API_KEY)
        const productService = container.resolve(Modules.PRODUCT)
        const link = container.resolve('link')

        const channel = await salesChannelService.createSalesChannels({
          name: 'Loja Online',
        })
        const apiKey = await apiKeyService.createApiKeys({
          title: 'Teste',
          type: 'publishable',
          created_by: 'test',
        })
        await link.create({
          [Modules.API_KEY]: { publishable_key_id: apiKey.id },
          [Modules.SALES_CHANNEL]: { sales_channel_id: channel.id },
        })

        const product = await productService.createProducts({
          title: 'Colar de Teste',
          handle: 'colar-de-teste',
          status: 'published',
        })
        await link.create({
          [Modules.PRODUCT]: { product_id: product.id },
          [Modules.SALES_CHANNEL]: { sales_channel_id: channel.id },
        })

        const res = await api.get('/store/products', {
          headers: { 'x-publishable-api-key': apiKey.token },
        })

        expect(res.status).toBe(200)
        expect(res.data.count).toBe(1)
        expect(res.data.products[0].handle).toBe('colar-de-teste')
      })
    })
  },
})

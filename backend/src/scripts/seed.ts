import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, ProductStatus } from '@medusajs/framework/utils'
import {
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  deleteProductCategoriesWorkflow,
  deleteProductsWorkflow,
} from '@medusajs/medusa/core-flows'

const FINISHES = [
  { name: 'Prateado', code: 'PRA', extra: 0 },
  { name: 'Dourado PVD', code: 'DOU', extra: 4 },
  { name: 'Preto', code: 'PRE', extra: 2 },
]

type Item = {
  title: string
  handle: string
  category: string
  sizes: string[]
  price: number
  description: string
}

const ITEMS: Item[] = [
  // Colares
  {
    title: 'Colar Corrente Fina',
    handle: 'colar-corrente-fina',
    category: 'Colares',
    sizes: ['40 cm', '45 cm', '50 cm'],
    price: 19.9,
    description: 'Corrente fina e discreta, para usar todos os dias.',
  },
  {
    title: 'Colar Corrente Grossa',
    handle: 'colar-corrente-grossa',
    category: 'Colares',
    sizes: ['45 cm', '50 cm', '55 cm'],
    price: 29.9,
    description: 'Elos largos com presença, para um look marcante.',
  },
  {
    title: 'Colar Pendente Gota',
    handle: 'colar-pendente-gota',
    category: 'Colares',
    sizes: ['40 cm', '45 cm'],
    price: 24.9,
    description: 'Pendente em forma de gota, polido a espelho.',
  },
  {
    title: 'Colar Pendente Círculo',
    handle: 'colar-pendente-circulo',
    category: 'Colares',
    sizes: ['40 cm', '45 cm'],
    price: 22.9,
    description: 'Círculo minimalista numa corrente delicada.',
  },
  {
    title: 'Colar Choker',
    handle: 'colar-choker',
    category: 'Colares',
    sizes: ['35 cm', '38 cm'],
    price: 21.9,
    description: 'Choker ajustável, justo ao pescoço.',
  },
  {
    title: 'Colar Cordão Veneziano',
    handle: 'colar-cordao-veneziano',
    category: 'Colares',
    sizes: ['45 cm', '50 cm'],
    price: 26.9,
    description: 'Malha veneziana de textura suave.',
  },
  // Pulseiras
  {
    title: 'Pulseira Malha Fina',
    handle: 'pulseira-malha-fina',
    category: 'Pulseiras',
    sizes: ['17 cm', '19 cm'],
    price: 17.9,
    description: 'Pulseira leve de malha fina.',
  },
  {
    title: 'Pulseira Elos Grossos',
    handle: 'pulseira-elos-grossos',
    category: 'Pulseiras',
    sizes: ['18 cm', '20 cm'],
    price: 27.9,
    description: 'Elos grossos com fecho de mosquetão.',
  },
  {
    title: 'Pulseira Rígida',
    handle: 'pulseira-rigida',
    category: 'Pulseiras',
    sizes: ['Único'],
    price: 24.9,
    description: 'Bracelete rígido de abertura ajustável.',
  },
  {
    title: 'Pulseira Tennis',
    handle: 'pulseira-tennis',
    category: 'Pulseiras',
    sizes: ['17 cm', '19 cm'],
    price: 32.9,
    description: 'Fiada contínua de zircónias brilhantes.',
  },
  {
    title: 'Pulseira Trançada',
    handle: 'pulseira-trancada',
    category: 'Pulseiras',
    sizes: ['18 cm', '20 cm'],
    price: 22.9,
    description: 'Trançado texturado, unissexo.',
  },
  // Brincos
  {
    title: 'Brincos Argola Pequena',
    handle: 'brincos-argola-pequena',
    category: 'Brincos',
    sizes: ['Único'],
    price: 14.9,
    description: 'Argolas pequenas, leves e confortáveis.',
  },
  {
    title: 'Brincos Argola Grande',
    handle: 'brincos-argola-grande',
    category: 'Brincos',
    sizes: ['Único'],
    price: 18.9,
    description: 'Argolas grandes de fecho seguro.',
  },
  {
    title: 'Brincos Pérola',
    handle: 'brincos-perola',
    category: 'Brincos',
    sizes: ['Único'],
    price: 16.9,
    description: 'Pérola sintética sobre haste de aço.',
  },
  {
    title: 'Brincos Gota',
    handle: 'brincos-gota',
    category: 'Brincos',
    sizes: ['Único'],
    price: 15.9,
    description: 'Brincos pendentes em forma de gota.',
  },
  // Anéis
  {
    title: 'Anel Liso',
    handle: 'anel-liso',
    category: 'Anéis',
    sizes: ['12', '14', '16', '18'],
    price: 12.9,
    description: 'Aliança lisa, o básico indispensável.',
  },
  {
    title: 'Anel Zircónia',
    handle: 'anel-zirconia',
    category: 'Anéis',
    sizes: ['12', '14', '16', '18'],
    price: 16.9,
    description: 'Zircónia central com acabamento polido.',
  },
  {
    title: 'Anel Entrelaçado',
    handle: 'anel-entrelacado',
    category: 'Anéis',
    sizes: ['12', '14', '16', '18'],
    price: 15.9,
    description: 'Duas bandas entrelaçadas num só anel.',
  },
  // Conjuntos
  {
    title: 'Conjunto Colar e Pulseira Fina',
    handle: 'conjunto-colar-pulseira-fina',
    category: 'Conjuntos',
    sizes: ['Único'],
    price: 34.9,
    description: 'Colar e pulseira de malha fina a condizer.',
  },
  {
    title: 'Conjunto Brincos e Colar Gota',
    handle: 'conjunto-brincos-colar-gota',
    category: 'Conjuntos',
    sizes: ['Único'],
    price: 36.9,
    description: 'Colar e brincos com pendente em gota.',
  },
]

const CATEGORIES = ['Colares', 'Pulseiras', 'Brincos', 'Anéis', 'Conjuntos']
const DEMO_HANDLES = ['t-shirt', 'sweatshirt', 'sweatpants', 'shorts']
const DEMO_CATEGORIES = ['Shirts', 'Sweatshirts', 'Pants', 'Merch']
const STOCK = 50

export default async function seed({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  // 1. Limpar dados de demonstração do template
  const { data: demoProducts } = await query.graph({
    entity: 'product',
    fields: ['id'],
    filters: { handle: DEMO_HANDLES },
  })
  if (demoProducts.length) {
    await deleteProductsWorkflow(container).run({
      input: { ids: demoProducts.map((p) => p.id) },
    })
    logger.info(`Removidos ${demoProducts.length} produtos de demonstração`)
  }
  const { data: demoCats } = await query.graph({
    entity: 'product_category',
    fields: ['id'],
    filters: { name: DEMO_CATEGORIES },
  })
  if (demoCats.length) {
    await deleteProductCategoriesWorkflow(container).run({
      input: demoCats.map((c) => c.id),
    })
  }

  // 2. Dependências já criadas no painel
  const { data: channels } = await query.graph({
    entity: 'sales_channel',
    fields: ['id', 'name'],
    filters: { name: 'Loja Online' },
  })
  if (!channels.length) throw new Error('Sales channel "Loja Online" não existe')
  const { data: locations } = await query.graph({
    entity: 'stock_location',
    fields: ['id', 'name'],
  })
  const location = locations.find((l) => l.name === 'Armazém Portugal') ?? locations[0]
  const { data: profiles } = await query.graph({
    entity: 'shipping_profile',
    fields: ['id'],
  })
  const salesChannelId = channels[0].id
  const shippingProfileId = profiles[0].id

  // 3. Categorias (só as que faltam)
  const { data: existingCats } = await query.graph({
    entity: 'product_category',
    fields: ['id', 'name'],
  })
  const missingCats = CATEGORIES.filter((n) => !existingCats.some((c) => c.name === n))
  if (missingCats.length) {
    await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCats.map((name) => ({ name, is_active: true })),
      },
    })
  }
  const { data: cats } = await query.graph({
    entity: 'product_category',
    fields: ['id', 'name'],
  })
  const catId = (name: string) => cats.find((c) => c.name === name)!.id

  // 4. Produtos (ignora handles que já existem)
  const { data: existing } = await query.graph({
    entity: 'product',
    fields: ['handle'],
  })
  const existingHandles = new Set(existing.map((p) => p.handle))
  const toCreate = ITEMS.filter((i) => !existingHandles.has(i.handle))

  if (toCreate.length) {
    await createProductsWorkflow(container).run({
      input: {
        products: toCreate.map((item) => ({
          title: item.title,
          handle: item.handle,
          description: item.description,
          status: ProductStatus.PUBLISHED,
          category_ids: [catId(item.category)],
          shipping_profile_id: shippingProfileId,
          sales_channels: [{ id: salesChannelId }],
          metadata: {
            material: 'Aço inoxidável 316L',
            hipoalergenico: true,
            resistente_agua: true,
            cuidados: 'Limpar com pano macio. Evitar perfumes e químicos.',
          },
          options: [
            { title: 'Acabamento', values: FINISHES.map((f) => f.name) },
            { title: 'Tamanho', values: item.sizes },
          ],
          variants: FINISHES.flatMap((f) =>
            item.sizes.map((size) => ({
              title: `${f.name} / ${size}`,
              sku: `${item.handle.toUpperCase()}-${f.code}-${size.replace(/\W/g, '')}`,
              manage_inventory: true,
              options: { Acabamento: f.name, Tamanho: size },
              prices: [
                {
                  currency_code: 'eur',
                  amount: Math.round((item.price + f.extra) * 100) / 100,
                },
              ],
            })),
          ),
        })),
      },
    })
    logger.info(`Criados ${toCreate.length} produtos`)
  } else {
    logger.info('Nenhum produto novo a criar')
  }

  // 5. Stock (só para itens sem nível neste armazém)
  const { data: items } = await query.graph({
    entity: 'inventory_item',
    fields: ['id'],
  })
  const { data: levels } = await query.graph({
    entity: 'inventory_level',
    fields: ['inventory_item_id'],
    filters: { location_id: location.id },
  })
  const withLevel = new Set(levels.map((l) => l.inventory_item_id))
  const missing = items.filter((i) => !withLevel.has(i.id))
  if (missing.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: missing.map((i) => ({
          inventory_item_id: i.id,
          location_id: location.id,
          stocked_quantity: STOCK,
        })),
      },
    })
    logger.info(`Stock criado para ${missing.length} itens`)
  }
  logger.info('Seed concluído')
}

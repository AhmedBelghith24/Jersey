// src/app/admin/products/[id]/edit/page.tsx
import type { Metadata, PageProps } from 'next'
import Link from 'next/link'
import { fetchSingleProduct } from '@/utils/actions'
import { formatCurrency } from '@/utils/format'

// Keep Node runtime if your data layer uses Prisma/Node APIs
export const runtime = 'nodejs'

export async function generateMetadata(
  props: PageProps<'/admin/products/[id]/edit'>
): Promise<Metadata> {
  const { id } = await props.params
  return { title: `Edit Product ${id}` }
}

export default async function EditProductPage(
  props: PageProps<'/admin/products/[id]/edit'>
) {
  // ✅ Next 15: params is a Promise — await it
  const { id } = await props.params

  const product = await fetchSingleProduct(id)
  const {
    name = '',
    company = '',
    description = '',
    price = 0,
    image = '',
  } = product ?? {}

  const dollarsAmount = formatCurrency(price)

  return (
    <section className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">ID: {id}</p>
        </div>
        <span className="text-sm bg-muted px-3 py-1 rounded">
          Current price: {dollarsAmount}
        </span>
      </header>

      {/* Replace with your own admin form / server action if you have one */}
      <form className="grid gap-4 max-w-2xl">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={name}
            className="border rounded-md px-3 py-2"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company
          </label>
          <input
            id="company"
            name="company"
            defaultValue={company}
            className="border rounded-md px-3 py-2"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price (cents)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            inputMode="numeric"
            defaultValue={price}
            className="border rounded-md px-3 py-2"
          />
          <p className="text-xs text-muted-foreground">
            Stored as an integer (e.g. $12.34 → 1234)
          </p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="image" className="text-sm font-medium">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            defaultValue={image}
            className="border rounded-md px-3 py-2"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={description}
            className="border rounded-md px-3 py-2"
          />
        </div>

        {/* Hidden field for ID if your action expects it */}
        <input type="hidden" name="id" value={id} />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-md px-4 py-2 bg-black text-white"
          >
            Save changes
          </button>
          <Link href={`/products/${id}`} className="rounded-md px-4 py-2 border">
            View product
          </Link>
        </div>
      </form>
    </section>
  )
}

// src/app/admin/products/[id]/edit/page.tsx
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction,
} from '@/utils/actions'

import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import PriceInput from '@/components/form/PriceInput'
import TextAreaInput from '@/components/form/TextAreaInput'
import { SubmitButton } from '@/components/form/Buttons'
import CheckboxInput from '@/components/form/CheckboxInput'
import ImageInputContainer from '@/components/form/ImageInputContainer'
import type { PageProps } from 'next'

// Keep Node runtime if your data layer uses Prisma/Node APIs
export const runtime = 'nodejs'

export default async function EditProductPage(
  props: PageProps<'/admin/products/[id]/edit'>
) {
  // ✅ Next 15: params is a Promise — await it
  const { id } = await props.params

  const product = await fetchAdminProductDetails(id)

  if (!product) {
    return <div className="text-red-600">Product not found.</div>
  }

  const { name, company, description, featured, price, image } = product

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>

      {/* 🖼️ Separate form for updating image */}
      <div className="border p-8 rounded-md mb-8">
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={image}
          text="update image"
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image} />
        </ImageInputContainer>
      </div>

      {/* 📝 Form for updating product details */}
      <div className="border p-8 rounded-md">
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
          </div>

          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />

          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>

          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
}

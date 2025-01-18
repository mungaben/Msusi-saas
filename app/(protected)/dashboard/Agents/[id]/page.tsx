

import { DashboardHeader } from '@/components/dashboard/header'
import { EmptyPlaceholder } from '@/components/shared/empty-placeholder'
import React from 'react'
import { Button } from 'react-day-picker'

//  id props params

type Idpramsprops = {
  params: Promise<{ id: string }>
}
const page =  async ( {params}: Idpramsprops) => {
   const { id } = await  params
//  top -cards :what revenue generated , clients , sales ...
// table.. with list of orders taken by agents

  return (
    <>
    <DashboardHeader
      heading={`Agents ${id}`}
      text="Check and manage your latest Agents."
    />
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="package" />
      <EmptyPlaceholder.Title>Agents {id}</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You don&apos;t have any Agents yet. Start ordering a product.
      </EmptyPlaceholder.Description>
      <Button>{id}</Button>
    </EmptyPlaceholder>
  </>
  )
}

export default page
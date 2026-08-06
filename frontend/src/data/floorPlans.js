export const floorPlanCategories = [
  { id: 'tipo-1', label: 'Tipo 1' },
  { id: 'tipo-2', label: 'Tipo 2' },
  { id: 'garden', label: 'Garden' },
]

export const floorPlans = [
  {
    id: 'tipo-1-3-quartos',
    category: 'tipo-1',
    categoryLabel: 'Tipo 1',
    label: 'Tipo 1 · 3 quartos',
    shortLabel: '3 quartos',
    bedrooms: 3,
    variant: null,
    area: null,
    imageUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Tipo1-3Quartos.jpg',
    sourceUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Tipo1-3Quartos.jpg',
    alt: 'Planta humanizada Tipo 1 com 3 quartos do Oásis II Residencial',
  },
  {
    id: 'tipo-1-2-quartos',
    category: 'tipo-1',
    categoryLabel: 'Tipo 1',
    label: 'Tipo 1 · 2 quartos',
    shortLabel: '2 quartos',
    bedrooms: 2,
    variant: null,
    area: null,
    imageUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Tipo1-2Quartos.jpg',
    sourceUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Tipo1-2Quartos.jpg',
    alt: 'Planta humanizada Tipo 1 com 2 quartos do Oásis II Residencial',
  },
  {
    id: 'tipo-2-3-quartos',
    category: 'tipo-2',
    categoryLabel: 'Tipo 2',
    label: 'Tipo 2 · 3 quartos',
    shortLabel: '3 quartos',
    bedrooms: 3,
    variant: null,
    area: null,
    imageUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Tipo2-3Quartos.jpg',
    sourceUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Tipo2-3Quartos.jpg',
    alt: 'Planta humanizada Tipo 2 com 3 quartos do Oásis II Residencial',
  },
  {
    id: 'tipo-2-2-quartos',
    category: 'tipo-2',
    categoryLabel: 'Tipo 2',
    label: 'Tipo 2 · 2 quartos',
    shortLabel: '2 quartos',
    bedrooms: 2,
    variant: null,
    area: null,
    imageUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Tipo2-2Quartos.jpg',
    sourceUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Tipo2-2Quartos.jpg',
    alt: 'Planta humanizada Tipo 2 com 2 quartos do Oásis II Residencial',
  },
  {
    id: 'garden-ponta-3-quartos',
    category: 'garden',
    categoryLabel: 'Garden',
    label: 'Garden Ponta · 3 quartos',
    shortLabel: 'Ponta · 3 quartos',
    bedrooms: 3,
    variant: 'Ponta',
    area: null,
    imageUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Ponta_Garden-3Quartos.jpg',
    sourceUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Ponta_Garden-3Quartos.jpg',
    alt: 'Planta humanizada Garden Ponta com 3 quartos do Oásis II Residencial',
  },
  {
    id: 'garden-meio-01-2-quartos',
    category: 'garden',
    categoryLabel: 'Garden',
    label: 'Garden Meio 01 · 2 quartos',
    shortLabel: 'Meio 01 · 2 quartos',
    bedrooms: 2,
    variant: 'Meio 01',
    area: null,
    imageUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Meio_Garden-01-2Quartos.jpg',
    sourceUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Meio_Garden-01-2Quartos.jpg',
    alt: 'Planta humanizada Garden Meio 01 com 2 quartos do Oásis II Residencial',
  },
  {
    id: 'garden-meio-02-2-quartos',
    category: 'garden',
    categoryLabel: 'Garden',
    label: 'Garden Meio 02 · 2 quartos',
    shortLabel: 'Meio 02 · 2 quartos',
    bedrooms: 2,
    variant: 'Meio 02',
    area: null,
    imageUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Meio_Garden-02-2Quartos.jpg',
    sourceUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Meio_Garden-02-2Quartos.jpg',
    alt: 'Planta humanizada Garden Meio 02 com 2 quartos do Oásis II Residencial',
  },
  {
    id: 'garden-meio-03-2-quartos',
    category: 'garden',
    categoryLabel: 'Garden',
    label: 'Garden Meio 03 · 2 quartos',
    shortLabel: 'Meio 03 · 2 quartos',
    bedrooms: 2,
    variant: 'Meio 03',
    area: null,
    imageUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Meio_Garden-03-2Quartos.jpg',
    sourceUrl:
      'https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Humanizadas-Meio_Garden-03-2Quartos.jpg',
    alt: 'Planta humanizada Garden Meio 03 com 2 quartos do Oásis II Residencial',
  },
]

export function getPlansByCategory(categoryId) {
  return floorPlans.filter((plan) => plan.category === categoryId)
}

export function getFloorPlanById(id) {
  return floorPlans.find((plan) => plan.id === id) || floorPlans[0]
}

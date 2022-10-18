

export const convertUrl = (name) => {
  return name.trim().toLowerCase().replaceAll(' ', '').replaceAll(' ' , '-').replaceAll('.', '-').replaceAll(',', '-')
}
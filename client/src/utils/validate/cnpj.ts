export default function validarCNPJ(cnpj: string): boolean {
  const cleaned = cnpj.replace(/[^\d]+/g, "");

  if (cleaned.length !== 14) return false;

  if (/^(\d)\1+$/.test(cleaned)) return false;

  const calcularDigito = (base: string): number => {
    let soma = 0;
    let peso = base.length - 7;

    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i]!) * peso--;
      if (peso < 2) peso = 9;
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base12 = cleaned.substring(0, 12);
  const digito1 = calcularDigito(base12);

  const base13 = base12 + digito1;
  const digito2 = calcularDigito(base13);

  return cleaned === base12 + digito1.toString() + digito2.toString();
}

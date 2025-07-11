export const formatCPF = (value: string = ''): string => {
    return value
        .replace(/\D/g, '') // 1. Remove tudo o que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // 2. Coloca um ponto entre o terceiro e o quarto dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // 3. Coloca um ponto entre o sexto e o sétimo dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // 4. Coloca um hífen entre o nono e o décimo dígitos
        .substring(0, 14); // 5. Garante que o tamanho máximo seja 14
}

export function formatTelefone(value: string): string {
    if (!value) return '';
    
    // Remove tudo que não for número
    const cleaned = value.replace(/\D/g, '');

    // Formata com base na quantidade de dígitos
    if (cleaned.length <= 10) {
        // Fixo: (99) 9999-9999
        return cleaned.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_match, ddd, parte1, parte2) => {
            return `${ddd ? `(${ddd}` : ''}${parte1 ? `) ${parte1}` : ''}${parte2 ? `-${parte2}` : ''}`;
        });
    } else {
        // Celular: (99) 99999-9999
        return cleaned.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_match, ddd, parte1, parte2) => {
            return `${ddd ? `(${ddd}` : ''}${parte1 ? `) ${parte1}` : ''}${parte2 ? `-${parte2}` : ''}`;
        });
    }
}

export function formatDate(value: string): string {
    if (!value) return '';

    // Remove tudo que não for número
    const cleaned = value.replace(/\D/g, '');

    // Aplica a máscara: dd/mm/aaaa
    return cleaned.replace(/^(\d{0,2})(\d{0,2})(\d{0,4}).*/, (_match, dia, mes, ano) => {
        return [dia, mes, ano].filter(Boolean).join('/');
    });
}


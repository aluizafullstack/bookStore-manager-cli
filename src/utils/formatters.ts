export function formatarDataHora(data: Date): string {
    return data.toLocaleString('pt-BR');
}

export function formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR');
}

export function formatarDataOuTraco(data: Date | null): string {
    return data ? formatarData(data) : '-';
}
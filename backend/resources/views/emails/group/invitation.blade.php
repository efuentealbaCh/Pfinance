<x-mail::message>
# ¡Hola, {{ $invitee->name }}!

**{{ $group->creator->name }}** te ha invitado a unirte al grupo "**{{ $group->name }}**" en Pfinance.

Al unirte a este grupo, podrán administrar cuentas, gastos y deudas compartidas.

<x-mail::button :url="$url">
Ver Mis Grupos
</x-mail::button>

Gracias,<br>
El equipo de Pfinance
</x-mail::message>

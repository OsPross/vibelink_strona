import { redirect } from "next/navigation";

export default function RootPage() {
  // Przekierowujemy domyślnie na wersję angielską lub polską. 
  // Wybierz tę, którą wolisz jako domyślną. Tutaj dałem /en:
  redirect("/en"); 
}
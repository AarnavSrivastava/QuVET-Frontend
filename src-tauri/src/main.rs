#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// #[tauri::command]
// fn println_term(message: &str) {
//   println!("{}", message);
// }

fn main() {
tauri::Builder::default()
  // .invoke_handler(tauri::generate_handler![println_term])
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="bn">
  <head>
    <meta charset="utf-8" />
    <title>কোনো একটা ডিশটাপ হইছে মনে হয়।</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #faf8f5; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; box-sizing: border-box; }
      *, *:before, *:after { box-sizing: inherit; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2.5rem 2rem; background: #ffffff; border: 1px solid #f3f4f6; border-radius: 2rem; shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
      .icon { font-size: 2.5rem; margin-bottom: 1rem; display: block; animation: bounce 2s infinite; }
      h1 { font-size: 1.25rem; font-weight: 900; margin: 0 0 0.75rem; color: #1f2937; line-height: 1.4; }
      p { color: #6b7280; font-weight: 600; margin: 0 0 1.75rem; font-size: 0.9rem; line-height: 1.6; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.75rem 1.5rem; border-radius: 1.25rem; font: inherit; font-size: 0.875rem; font-weight: 800; cursor: pointer; text-decoration: none; border: 1px solid transparent; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center; }
      .primary { background: #d97706; color: #fff; box-shadow: 0 4px 6px -1px rgba(217, 119, 6, 0.2); }
      .primary:hover { background: #b45309; transform: translateY(-1px); }
      .primary:active { transform: scale(0.97); }
      .secondary { background: #fff; color: #374151; border-color: #e5e7eb; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
      .secondary:hover { background: #f9fafb; border-color: #d1d5db; transform: translateY(-1px); }
      .secondary:active { transform: scale(0.97); }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @media (max-width: 480px) {
        body { padding: 1rem; }
        .card { padding: 2rem 1.25rem; border-radius: 1.5rem; }
        .icon { font-size: 2.25rem; }
        h1 { font-size: 1.125rem; margin-bottom: 0.5rem; }
        p { font-size: 0.825rem; margin-bottom: 1.5rem; }
        a, button { padding: 0.65rem 1.15rem; border-radius: 1rem; font-size: 0.825rem; width: 100%; }
        .actions { flex-direction: column; gap: 0.5rem; width: 100%; }
      }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="icon">☕</span>
      <h1>কোনো একটা ডিশটাপ হইছে মনে হয়।</h1>
      <p>স্যাররা লাঞ্চে গেছেন বা সার্ভার একটু জ্যাম খাইছে, একটু পর আবার ট্রাই মারেন!</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">আবার একটু টিপ দেন তো।</button>
        <a class="secondary" href="/">নিজের ডেরায় চলেন ওস্তাদ</a>
      </div>
    </div>
  </body>
</html>`;
}

# Kanban
İstifadəçilərin günlük tapşırıqlarını səliqəli şəkildə idarə etməsi, statuslarını dəyişməsi və prioriteti üzrə süzgəcdən keçirməsi üçün hazırlanmış interaktiv **Kanban** tətbiqi.
## Layihə haqqında
Bu layihə tapşırıqların (Tasks) idarə olunmasını asanlaşdıran veb tətbiqdir. Tətbiq vasitəsilə yeni tapşırıq yarada, onları redaktə edə, silə, sürüşdürərək (Drag & Drop) statusunu dəyişə və ya axtarış/filtrasiya paneli ilə süzgəcdən keçirə bilərsiniz.

### **Əsas Özəlliklər:**
**3 Əsas Status Sütunu:** *To Do (Gözləmədə)*, *Doing (İcra olunur)*, *Done (Tamamlandı)*.
**Drag and Drop (Sürüşdür və Burax):** Kartları mausla tutub digər sütunlara daşımaq imkanı.
**LocalStorage Dəstəyi:** Səhifə yeniləndə (refresh) məlumatların yaddaşda saxlanılması.
**Axtarış və Filtrasiya:** Başlıq/açıqlama üzrə anlıq axtarış və prioritetə görə (Aşağı, Orta, Yüksək) süzgəc.
**Təhlükəsiz Render (XSS Qoruması):** İstifadəçi tərəfindən daxil edilən mətnlərin təhlükəsiz şəkildə ekrana çıxarılması.
**Tam Responsiv Dizayn:** Mobil, planşet və noutbuk ekranlarına tam uyğunlaşdırılmış interfeys.
## 🛠️ İstifadə Olunan Texnologiyalar
**HTML5** — Veb səhifənin semantik strukturu
**CSS3** — Dizayn, animation (`@keyframes`), Flexbox və `@media` responsivliyi
**JavaScript (Vanilla JS - ES6+)** — DOM ilə iş, Event Handling, Drag & Drop API, LocalStorage


## Quraşdırma 
Tətbiqi öz komputerinizdə lokal olaraq işə salmaq üçün aşağıdakı addımları yerinə yetirin:

1. **Repository-ni kopyalayın (Clone):**
   ```bash
   git clone [https://github.com/SamaGoyusova02/Kanban.git](https://github.com/SamaGoyusova02/Kanban.git)
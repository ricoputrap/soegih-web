# **Design System Specification: "WealthWise" Aesthetic**

## **1. Color Palette**

| Element              | Hex Code  | Usage                                                 |
| -------------------- | --------- | ----------------------------------------------------- |
| **Primary Accent**   | `#2D7A7F` | Buttons, active states, primary branding.             |
| **Secondary Accent** | `#E5F2F2` | Light tinted backgrounds for icons or hover states.   |
| **Main Text**        | `#111827` | High-contrast headings and primary labels.            |
| **Secondary Text**   | `#6B7280` | Sub-headings, helper text, and placeholders.          |
| **Page Background**  | `#F9FAFB` | Main canvas background.                               |
| **Card/Surface**     | `#FFFFFF` | Login containers, input fields, white-space sections. |
| **Border/Divider**   | `#E5E7EB` | Subtle hairlines for inputs and section breaks.       |

---

## **2. Typography**

- **Font Family:** Geometric Sans-Serif (e.g., `Inter`, `Plus Jakarta Sans`, or `Geist`).
- **Weights:** \* **Bold (700):** Main hero headers and primary metrics.
- **Medium (500):** Navigation links, button text, field labels.
- **Regular (400):** Body copy and secondary descriptions.

### **Scale**

- **H1 (Hero):** 36px – 42px | Bold | `#111827`
- **H2 (Section):** 24px – 28px | Bold | `#111827`
- **Body (Large):** 16px | Regular | `#374151`
- **Body (Small/Caption):** 13px – 14px | Regular | `#6B7280`

---

## **3. Layout & Spatial Rules**

- **Container Max-Width:** 1200px (centered).
- **Border Radius:** \* **Large (16px):** Main login card, feature cards on landing page.
- **Medium (8px):** Buttons and input fields.

- **Gutter/Spacing:** \* **Sections:** 80px – 120px vertical padding.
- **Internal Card Padding:** 24px – 32px.
- **Element Gap:** 16px – 20px (between inputs or small grid items).

---

## **4. Component Styling**

### **Buttons**

- **Primary:** Background `#2D7A7F`, Text `#FFFFFF`, Weight `Medium`, Radius `8px`.
- **Secondary/Ghost:** Background `Transparent`, Border `1px solid #E5E7EB`, Text `#111827`.
- **Hover State:** Reduce opacity to 90% or darken hex by 5%.

### **Input Fields (Login Page)**

- **Background:** `#FFFFFF`.
- **Border:** `1px solid #E5E7EB`.
- **Placeholder Text:** `#9CA3AF`.
- **Focus State:** Border color changes to `#2D7A7F` with a subtle `2px` outer glow.

### **Iconography**

- **Style:** Monolinear (1.5pt – 2pt stroke weight).
- **Color:** Primary `#2D7A7F` or Dark Gray `#111827`.
- **Container:** Often placed inside a light circular background (e.g., `#F3F4F6`).

---

## **5. Landing Page Hierarchy**

1. **Top Nav:** Logo (left), Links (center/right), Primary CTA Button (far right).
2. **Hero:** Large H1 header, supportive sub-text (max-width 600px), and a single primary action button.
3. **Feature Grid:** 3-column layout using the "Card" style (White background, subtle border, 16px radius).
4. **Login Page:** Centered card (approx. 400px wide) against the `#F9FAFB` background.

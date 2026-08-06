# Accessibility Review

Reviewed 2026-07-30.

- Existing semantic headers, button roles, radio/checkbox roles, selected/checked state, live feedback region, and 48 px touch targets remain intact.
- Informative images have specific English and draft Spanish alt text. Decorative images are excluded from the accessibility tree.
- Image meaning is repeated in curriculum text; no clinical distinction depends only on the image.
- Focusable controls retain browser focus behavior; generated-class selectors are not used by tests.
- Reduced-motion preference is observed by interactive press motion.
- Text remains selectable/readable and no text is placed over imagery.
- Phone views at 390 and 430 px showed no horizontal scrolling. Tablet and desktop use a constrained 900 px content width.
- Native screen-reader, Dynamic Type, hardware keyboard, VoiceOver, TalkBack, and safe-area/keyboard behavior still require device testing.

Known limitation: attribution text is intentionally omitted on compact decorative/hero previews and appears with the corresponding full informative lesson image and in the source registry.

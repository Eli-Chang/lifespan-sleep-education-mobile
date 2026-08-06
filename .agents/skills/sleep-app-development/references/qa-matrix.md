# QA matrix

| Surface | Browser | Native | Evidence |
| --- | --- | --- | --- |
| Routes/navigation | Playwright | Android/iOS when available | route inventory, trace |
| Mobile layout | 320–430px and 768px | physical safe areas/keyboard | screenshots, defect report |
| Localization | English and Spanish | native font scaling when available | parity and screenshots |
| Narration | mocked/browser API only | device TTS | explicit platform report |
| AI | mocked or safe dev endpoint | network reachability | request/response report |
| Persistence/reset | storage-seeded browser | restart if available | test output |

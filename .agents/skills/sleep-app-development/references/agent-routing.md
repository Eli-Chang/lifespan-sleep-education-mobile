# Agent routing

| Request | Required agents | Optional | Do not run by default |
| --- | --- | --- | --- |
| Narrow low-risk UI bug | app_implementer, playwright_flow_tester | mobile_visual_qa, accessibility_localization_reviewer | clinical_ai_safety_reviewer |
| New interface/navigation | app_planner, code_mapper, app_implementer, test_architect, playwright_flow_tester, mobile_visual_qa, accessibility_localization_reviewer, reliability_performance_reviewer, final_verifier | native_mobile_qa | privacy_security_reviewer |
| Lesson/English/Spanish content | app_planner, code_mapper, app_implementer, test_architect, clinical_ai_safety_reviewer, accessibility_localization_reviewer, playwright_flow_tester, final_verifier | mobile_visual_qa | privacy_security_reviewer |
| Storage, network | app_planner, code_mapper, app_implementer, test_architect, clinical_ai_safety_reviewer, privacy_security_reviewer, reliability_performance_reviewer, playwright_flow_tester, final_verifier | native_mobile_qa | product_ux_reviewer |
| Testing-only or release audit | app_planner, code_mapper, playwright_flow_tester, mobile_visual_qa, accessibility_localization_reviewer, reliability_performance_reviewer, final_verifier | native_mobile_qa, privacy_security_reviewer, clinical_ai_safety_reviewer | app_implementer |

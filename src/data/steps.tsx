"use client";

import { useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import Troublebox from "@/components/Troublebox";
import type { ReactNode } from "react";

export type OS = "windows" | "macos" | "linux";

export interface Step {
  title: string;
  subtitle: string;
  content: ReactNode;
}

/* ============================================================
   SHARED STEPS (OS 공통 - os 파라미터로 분기)
   ============================================================ */

const shared = {
  firstRun: (os: OS): Step => ({
    title: "Claude Code 실행하기",
    subtitle: "설치 완료! 이제 실행해봅시다",
    content: (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="step-number">1</div>
          <div className="flex-1">
            <h3 className="font-bold mb-2">프로젝트 폴더에서 실행</h3>
            <p className="text-sm text-gray-600 mb-3">
              작업할 프로젝트 폴더로 이동한 후{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-purple-600 text-xs">claude</code>{" "}
              명령어를 입력합니다.
            </p>
            <CodeBlock>
              {os === "windows"
                ? `$ cd C:\\Users\\사용자명\\my-project\n$ claude`
                : `$ cd ~/my-project\n$ claude`}
            </CodeBlock>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="step-number">2</div>
          <div className="flex-1">
            <h3 className="font-bold mb-2">로그인 방법 선택</h3>
            <div className="space-y-3">
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="font-semibold text-sm mb-1">방법 1: Claude 계정 로그인 (권장)</p>
                <p className="text-xs text-gray-600 mb-2">
                  Enter를 누르면 브라우저가 자동으로 열립니다. claude.ai에서 로그인 후 터미널로 돌아오면 자동 연결됩니다.
                </p>
                <p className="text-xs text-gray-500">Pro/Max 구독자에게 적합</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="font-semibold text-sm mb-1">방법 2: API 키 사용</p>
                <CodeBlock>
                  {os === "windows"
                    ? `$ set ANTHROPIC_API_KEY=sk-ant-xxxxx\n$ claude`
                    : `$ export ANTHROPIC_API_KEY=sk-ant-xxxxx\n$ claude`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>

        <div className="success-box">
          <p className="text-sm">
            <strong>로그인 성공!</strong> 이제 자연어로 요청하면 됩니다. 예: &quot;이 프로젝트 구조를 설명해줘&quot;
          </p>
        </div>

        {/* ---- 트러블슈팅 드롭다운 ---- */}
        <Troublebox
          items={[
            {
              emoji: "🌐",
              title: "브라우저가 자동으로 열리지 않아요",
              content: (
                <>
                  <p className="text-sm text-gray-600 mb-2">
                    WSL2, SSH, 원격 서버 등 GUI가 없는 환경에서 발생합니다.
                  </p>
                  <CodeBlock>{`# 터미널에 표시되는 URL을 복사하여\n# 로컬 브라우저에 직접 붙여넣기 합니다`}</CodeBlock>
                </>
              ),
            },
            {
              emoji: "🔑",
              title: "API 키를 입력했는데 인증 실패가 떠요",
              content: (
                <>
                  <p className="text-sm text-gray-600 mb-2">API 키가 올바른지, 만료되지 않았는지 확인하세요.</p>
                  <CodeBlock>{`# 키 형식 확인: sk-ant- 로 시작해야 합니다\n# console.anthropic.com 에서 새 키 발급 가능\n\n# 환경 변수가 제대로 설정됐는지 확인\n$ ${os === "windows" ? "echo %ANTHROPIC_API_KEY%" : "echo $ANTHROPIC_API_KEY"}`}</CodeBlock>
                </>
              ),
            },
            {
              emoji: "💳",
              title: "구독/크레딧이 없다는 메시지가 나와요",
              content: (
                <p className="text-sm text-gray-600">
                  Claude Code를 사용하려면 <strong>Claude Pro($20/월)</strong> 이상 구독 또는 API 크레딧이 필요합니다.{" "}
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                    claude.ai
                  </a>
                  에서 구독 상태를 확인하세요.
                </p>
              ),
            },
            {
              emoji: "⏳",
              title: "로그인 후 &quot;Connecting...&quot;에서 멈춰요",
              content: (
                <>
                  <p className="text-sm text-gray-600 mb-2">네트워크 문제일 수 있습니다.</p>
                  <div className="warning-box">
                    <p className="text-sm">
                      <strong>확인:</strong> VPN 해제 시도 / 방화벽에서 api.anthropic.com 허용 / 프록시 설정 확인
                    </p>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
    ),
  }),

  basicCommands: (os: OS): Step => ({
    title: "기본 명령어 익히기",
    subtitle: "자주 사용하는 핵심 명령어들",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { cmd: "/help", desc: "도움말 보기", icon: "❓" },
            { cmd: "/clear", desc: "대화 초기화", icon: "🗑" },
            { cmd: "/compact", desc: "컨텍스트 압축 (속도 개선)", icon: "⚡" },
            { cmd: "/cost", desc: "토큰 사용량·비용 확인", icon: "💰" },
            { cmd: "/model", desc: "AI 모델 변경", icon: "🔄" },
            { cmd: "Esc", desc: "현재 작업 중지", icon: "⏹" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <span className="text-xl">{item.icon}</span>
              <div>
                <code className="text-purple-600 text-sm font-bold">{item.cmd}</code>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="tip-box">
          <p className="text-sm">
            <strong>프롬프팅 팁:</strong> &quot;코드 고쳐줘&quot;보다 &quot;src/api.ts의 fetchUser 함수에서 null 체크 추가해줘&quot;처럼 구체적으로 요청하면 훨씬 좋은 결과를 얻습니다.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold mb-3">CLAUDE.md 파일 활용</h3>
          <p className="text-sm text-gray-600 mb-3">
            프로젝트 루트에{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">CLAUDE.md</code>{" "}
            파일을 만들면 Claude가 프로젝트 맥락을 이해합니다.
          </p>
          <CodeBlock title="CLAUDE.md 예시">{`# 프로젝트 컨텍스트\n- 기술 스택: Next.js + TypeScript + Tailwind\n- 테스트: Jest 사용\n- 코드 스타일: 한국어 주석 사용\n- 주의: .env 파일 절대 수정하지 말 것`}</CodeBlock>
        </div>

        {/* ---- 트러블슈팅 드롭다운 ---- */}
        <Troublebox
          items={[
            {
              emoji: "🐌",
              title: "응답이 너무 느려요",
              content: (
                <>
                  <p className="text-sm text-gray-600 mb-2">대화가 길어지면 컨텍스트가 커져 느려집니다.</p>
                  <CodeBlock>{`# 컨텍스트 압축으로 속도 개선\n> /compact\n\n# 또는 새 대화 시작\n> /clear`}</CodeBlock>
                </>
              ),
            },
            {
              emoji: "🚫",
              title: "파일을 수정하지 못하게 하고 싶어요",
              content: (
                <p className="text-sm text-gray-600">
                  Claude Code는 파일 수정 전에 항상 허가를 구합니다. <strong>거부(n)</strong>를 선택하면 수정하지 않습니다.
                  CLAUDE.md에 &quot;.env 파일 수정 금지&quot;처럼 규칙을 적어두면 사전에 방지할 수 있습니다.
                </p>
              ),
            },
            {
              emoji: "💸",
              title: "비용이 너무 많이 나가요",
              content: (
                <>
                  <p className="text-sm text-gray-600 mb-2">
                    <code className="bg-gray-100 px-1 rounded text-xs">/cost</code>로 현재 세션 비용을 확인하세요.
                  </p>
                  <div className="tip-box">
                    <p className="text-sm">
                      Max 구독($100~$200/월)은 사용량 무제한이라 비용 걱정이 없습니다. API 키 사용 시에는 <code className="bg-white/50 px-1 rounded text-xs">/model</code>에서
                      Haiku 같은 저렴한 모델로 전환하면 비용을 줄일 수 있습니다.
                    </p>
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
    ),
  }),

  ideSetup: (os: OS): Step => ({
    title: "IDE 연동 (선택)",
    subtitle: "VS Code, JetBrains에서 더 편리하게",
    content: (
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">📘</div>
            <h3 className="font-bold text-lg">VS Code</h3>
          </div>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>마켓플레이스에서 <strong>&quot;Claude Code&quot;</strong> 검색 후 설치</li>
            <li>
              <code className="bg-gray-100 px-1 rounded text-xs">
                {os === "macos" ? "Cmd+Shift+P" : "Ctrl+Shift+P"}
              </code>{" "}
              → &quot;Claude Code: Open&quot;
            </li>
            <li>IDE 내 패널에서 바로 사용</li>
          </ol>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl">✨</div>
            <h3 className="font-bold text-lg">JetBrains IDE</h3>
          </div>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>Settings → Plugins → <strong>&quot;Claude Code&quot;</strong> 검색 후 설치</li>
            <li>IDE 재시작 → 하단 패널에서 Claude Code 탭 확인</li>
            <li>IntelliJ, WebStorm, PyCharm 등 모든 JetBrains IDE 지원</li>
          </ol>
        </div>

        <div className="tip-box">
          <p className="text-sm">
            IDE 확장과 터미널{" "}
            <code className="bg-white/50 px-1 rounded">claude</code> 명령어를 동시에 사용할 수 있습니다. 동일한 인증 정보를 공유합니다.
          </p>
        </div>

        {/* ---- 트러블슈팅 드롭다운 ---- */}
        <Troublebox
          items={[
            {
              emoji: "🔍",
              title: "VS Code에서 &quot;Claude Code&quot; 확장이 검색되지 않아요",
              content: (
                <>
                  <p className="text-sm text-gray-600 mb-2">VS Code 버전이 너무 낮을 수 있습니다. 최신 버전으로 업데이트하세요.</p>
                  <CodeBlock>{`# VS Code 버전 확인\n# Help → About (또는 Code → About)\n# 1.90 이상 권장`}</CodeBlock>
                </>
              ),
            },
            {
              emoji: "🔌",
              title: "확장은 설치됐는데 패널이 안 보여요",
              content: (
                <p className="text-sm text-gray-600">
                  <code className="bg-gray-100 px-1 rounded text-xs">{os === "macos" ? "Cmd+Shift+P" : "Ctrl+Shift+P"}</code>
                  {" "}→ &quot;Claude Code: Open&quot;을 입력해보세요. 그래도 안 되면 VS Code를 완전히 종료 후 재실행하세요.
                </p>
              ),
            },
            {
              emoji: "🔐",
              title: "IDE에서 로그인이 안 돼요",
              content: (
                <p className="text-sm text-gray-600">
                  터미널에서 <code className="bg-gray-100 px-1 rounded text-xs">claude</code>로 먼저 로그인하면 IDE 확장이 동일한 인증 정보를 자동으로 사용합니다.
                  터미널에서 정상 로그인이 되는지 먼저 확인하세요.
                </p>
              ),
            },
          ]}
        />
      </div>
    ),
  }),

  faq: (): Step => ({
    title: "자주 묻는 질문",
    subtitle: "Claude Code에 대한 궁금증 해결",
    content: <FaqContent />,
  }),
};

/* ============================================================
   FAQ (단독 컴포넌트)
   ============================================================ */

function FaqContent() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: "Claude Code는 무료인가요?", a: "설치는 무료이지만, 사용하려면 Claude Pro($20/월), Max($100~$200/월) 구독이나 Anthropic API 크레딧이 필요합니다." },
    { q: "인터넷 없이 사용할 수 있나요?", a: "아니요, Anthropic AI 모델에 요청을 보내야 하므로 인터넷 연결이 필수입니다." },
    { q: "내 코드가 학습에 사용되나요?", a: "아닙니다. Claude Code로 전송되는 코드는 모델 학습에 사용되지 않습니다. 다만 민감한 자격 증명은 직접 입력하지 않는 것이 좋습니다." },
    { q: "어떤 언어를 지원하나요?", a: "Python, JS, TS, Java, Go, Rust, C++, Swift 등 대부분의 프로그래밍 언어를 지원합니다." },
    { q: "Git이 필수인가요?", a: "필수는 아니지만 강력 권장합니다. 커밋, PR 생성 등 Git 연동 기능을 제공하며 변경 관리에 유용합니다." },
    { q: "기존 프로젝트에서 바로 사용 가능한가요?", a: "네! 프로젝트 폴더에서 claude를 실행하면 바로 파일을 읽고 수정할 수 있습니다." },
    { q: "Copilot과 차이점은?", a: "Copilot은 코드 자동완성 중심이고, Claude Code는 에이전틱 방식으로 파일 생성/수정, 명령 실행, Git 작업 등을 자율적으로 수행합니다." },
  ];

  return (
    <div className="space-y-2">
      {faqs.map((item, i) => (
        <div key={i} className="faq-item">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full p-3.5 flex items-center gap-2.5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
              Q
            </span>
            <span className="font-medium text-sm flex-1">{item.q}</span>
            <span className={`text-xs transition-transform ${openIdx === i ? "rotate-180" : ""}`}>▼</span>
          </button>
          <div className={`accordion-content ${openIdx === i ? "open" : ""}`}>
            <p className="text-sm text-gray-600 leading-relaxed px-4 pb-3 ml-7">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   WINDOWS STEPS
   ============================================================ */

function buildWindowsSteps(): Step[] {
  return [
    {
      title: "Node.js 설치",
      subtitle: "Windows에 Node.js 18+ 설치하기",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Claude Code는 Node.js 18 이상이 필요합니다. 아래 방법 중 하나를 선택하세요.
          </p>

          <div className="flex items-start gap-3">
            <div className="step-number">1</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">버전 확인 (이미 설치된 경우)</h3>
              <CodeBlock>{`$ node --version\n$ npm --version`}</CodeBlock>
              <p className="text-xs text-gray-500 mt-2">v18 이상이면 이 단계를 건너뛰세요.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="step-number">2</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">설치 방법 선택</h3>
              <CodeBlock title="방법 A: winget (권장)">{`$ winget install OpenJS.NodeJS.LTS`}</CodeBlock>
              <CodeBlock title="방법 B: Chocolatey">{`$ choco install nodejs-lts`}</CodeBlock>
              <p className="text-xs text-gray-500 mt-2">
                또는{" "}
                <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                  nodejs.org
                </a>
                에서 LTS 설치 파일 다운로드
              </p>
            </div>
          </div>

          <div className="warning-box">
            <p className="text-sm">
              <strong>중요:</strong> 설치 후 터미널을 <strong>완전히 종료</strong>하고 다시 열어야 합니다.
            </p>
          </div>

          {/* ---- 트러블슈팅 ---- */}
          <Troublebox
            items={[
              {
                emoji: "❌",
                title: "'node'은(는) 내부 또는 외부 명령이 아닙니다",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">설치 후 터미널을 재시작하지 않았거나 PATH가 등록되지 않은 경우입니다.</p>
                    <div className="warning-box">
                      <p className="text-sm">
                        <strong>해결:</strong> 1) 터미널을 <strong>완전히 종료</strong> 후 재실행 →
                        2) 그래도 안 되면 시스템 환경 변수 → PATH에{" "}
                        <code className="bg-white/50 px-1 rounded text-xs">C:\Program Files\nodejs\</code> 추가
                      </p>
                    </div>
                  </>
                ),
              },
              {
                emoji: "🔢",
                title: "Node.js가 설치됐는데 버전이 18 미만이에요",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">기존 버전을 먼저 삭제하고 재설치하세요.</p>
                    <CodeBlock>{`# 기존 Node.js 삭제\n$ winget uninstall OpenJS.NodeJS\n\n# LTS 재설치\n$ winget install OpenJS.NodeJS.LTS`}</CodeBlock>
                  </>
                ),
              },
              {
                emoji: "🛡️",
                title: "winget / choco 명령어를 찾을 수 없어요",
                content: (
                  <p className="text-sm text-gray-600">
                    <strong>winget:</strong> Windows 10 1709 이상에서 기본 포함. Microsoft Store에서 &quot;앱 설치 관리자&quot;를 업데이트하세요.
                    <br />
                    <strong>choco:</strong> 별도 설치 필요. 두 다 안 되면{" "}
                    <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
                      nodejs.org
                    </a>
                    에서 직접 설치 파일을 다운로드하세요.
                  </p>
                ),
              },
              {
                emoji: "⚠️",
                title: "설치 중 &quot;Windows Defender SmartScreen&quot; 경고",
                content: (
                  <p className="text-sm text-gray-600">
                    nodejs.org 공식 설치 파일이라면 안전합니다. &quot;자세한 정보&quot; → &quot;실행&quot;을 클릭하세요.
                  </p>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Claude Code 설치",
      subtitle: "npm으로 Claude Code 전역 설치",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="step-number">1</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">npm으로 설치</h3>
              <p className="text-sm text-gray-600 mb-3">PowerShell 또는 Windows Terminal에서 실행합니다.</p>
              <CodeBlock>{`$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="step-number">2</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">설치 확인</h3>
              <CodeBlock>{`$ claude --version`}</CodeBlock>
              <div className="success-box mt-2">
                <p className="text-sm">버전 번호가 표시되면 성공입니다!</p>
              </div>
            </div>
          </div>

          {/* ---- 트러블슈팅 ---- */}
          <Troublebox
            items={[
              {
                emoji: "🔒",
                title: "EACCES: permission denied 권한 오류",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">관리자 권한이 필요합니다.</p>
                    <div className="warning-box">
                      <p className="text-sm">
                        <strong>해결:</strong> PowerShell을 <strong>관리자 권한</strong>으로 실행하세요.
                        (시작 메뉴 → PowerShell 우클릭 → 관리자로 실행)
                      </p>
                    </div>
                  </>
                ),
              },
              {
                emoji: "❌",
                title: "'claude'은(는) 내부 또는 외부 명령이 아닙니다",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">npm 글로벌 경로가 PATH에 없을 때 발생합니다.</p>
                    <CodeBlock title="1. npm 경로 확인">{`$ npm config get prefix`}</CodeBlock>
                    <div className="warning-box mt-2">
                      <p className="text-sm">
                        <strong>해결:</strong> 시스템 환경 변수 → PATH 편집 → 위 경로 추가
                        (보통 <code className="bg-white/50 px-1 rounded text-xs">C:\Users\사용자명\AppData\Roaming\npm</code>)
                        → 터미널 완전히 종료 후 재실행
                      </p>
                    </div>
                  </>
                ),
              },
              {
                emoji: "🌐",
                title: "ETIMEDOUT / 네트워크 오류로 설치가 안 돼요",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">회사 네트워크나 VPN 환경에서 발생할 수 있습니다.</p>
                    <CodeBlock title="프록시 설정">{`$ npm config set proxy http://proxy.company.com:8080\n$ npm config set https-proxy http://proxy.company.com:8080`}</CodeBlock>
                    <p className="text-sm text-gray-600 mt-2">VPN을 사용 중이라면 일시적으로 해제 후 시도해보세요.</p>
                  </>
                ),
              },
              {
                emoji: "🛡️",
                title: "Windows Defender가 설치를 차단해요",
                content: (
                  <p className="text-sm text-gray-600">
                    Windows 보안 → 바이러스 및 위협 방지 → 설정 관리 → 제외 추가에서{" "}
                    <code className="bg-gray-100 px-1 rounded text-xs">C:\Users\사용자명\AppData\Roaming\npm</code>{" "}
                    폴더를 예외로 추가하세요.
                  </p>
                ),
              },
              {
                emoji: "⚠️",
                title: "npm WARN deprecated / gyp ERR! 빌드 오류",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">WARN은 무시해도 됩니다. ERR이 나오면 빌드 도구가 필요합니다.</p>
                    <CodeBlock>{`$ npm install -g windows-build-tools`}</CodeBlock>
                  </>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    shared.firstRun("windows"),
    shared.basicCommands("windows"),
    shared.ideSetup("windows"),
    shared.faq(),
  ];
}

/* ============================================================
   macOS STEPS
   ============================================================ */

function buildMacSteps(): Step[] {
  return [
    {
      title: "Node.js 설치",
      subtitle: "macOS에 Node.js 18+ 설치하기",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Homebrew를 사용하는 것이 가장 편리합니다.</p>

          <div className="flex items-start gap-3">
            <div className="step-number">1</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">버전 확인 (이미 설치된 경우)</h3>
              <CodeBlock>{`$ node --version\n$ npm --version`}</CodeBlock>
              <p className="text-xs text-gray-500 mt-2">v18 이상이면 이 단계를 건너뛰세요.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="step-number">2</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">Homebrew로 설치</h3>
              <CodeBlock title="Homebrew 설치 (없는 경우)">{`$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}</CodeBlock>
              <CodeBlock title="Node.js 설치">{`$ brew install node`}</CodeBlock>
            </div>
          </div>

          <div className="tip-box">
            <p className="text-sm">
              <strong>nvm 사용자라면:</strong>{" "}
              <code className="bg-white/50 px-1 rounded text-xs">nvm install --lts</code>로 설치할 수 있습니다.
            </p>
          </div>

          {/* ---- 트러블슈팅 ---- */}
          <Troublebox
            items={[
              {
                emoji: "🍺",
                title: "brew: command not found",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">Homebrew가 설치되지 않았거나 PATH에 등록되지 않았습니다.</p>
                    <CodeBlock>{`# Homebrew 설치\n$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n\n# Apple Silicon Mac이라면 PATH 추가 필요\n$ echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc\n$ source ~/.zshrc`}</CodeBlock>
                  </>
                ),
              },
              {
                emoji: "🔢",
                title: "설치된 Node.js가 18 미만이에요",
                content: (
                  <CodeBlock>{`$ brew upgrade node\n# 또는 nvm 사용 시\n$ nvm install --lts && nvm use --lts`}</CodeBlock>
                ),
              },
              {
                emoji: "🔧",
                title: "Xcode Command Line Tools 관련 오류",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">Homebrew 설치 시 Xcode CLI 도구가 필요합니다.</p>
                    <CodeBlock>{`$ xcode-select --install`}</CodeBlock>
                    <p className="text-sm text-gray-500 mt-2">팝업 창에서 &quot;설치&quot;를 클릭하고 완료될 때까지 기다리세요.</p>
                  </>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Claude Code 설치",
      subtitle: "npm으로 Claude Code 전역 설치",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="step-number">1</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">npm으로 설치</h3>
              <CodeBlock>{`$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="step-number">2</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">설치 확인</h3>
              <CodeBlock>{`$ claude --version`}</CodeBlock>
              <div className="success-box mt-2">
                <p className="text-sm">버전 번호가 표시되면 성공입니다!</p>
              </div>
            </div>
          </div>

          {/* ---- 트러블슈팅 ---- */}
          <Troublebox
            items={[
              {
                emoji: "🔒",
                title: "EACCES: permission denied 권한 오류",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">글로벌 패키지 설치 시 권한이 부족합니다.</p>
                    <CodeBlock title="방법 1: sudo 사용">{`$ sudo npm install -g @anthropic-ai/claude-code`}</CodeBlock>
                    <CodeBlock title="방법 2: 소유권 변경 (권장)">{`$ sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`}</CodeBlock>
                  </>
                ),
              },
              {
                emoji: "❌",
                title: "command not found: claude",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">npm 글로벌 bin 경로가 PATH에 없습니다.</p>
                    <CodeBlock>{`# 경로 확인\n$ npm bin -g\n\n# zshrc에 추가\n$ echo 'export PATH=$(npm bin -g):$PATH' >> ~/.zshrc\n$ source ~/.zshrc`}</CodeBlock>
                  </>
                ),
              },
              {
                emoji: "🌐",
                title: "네트워크 오류로 설치 실패",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">VPN이나 프록시 환경에서 발생할 수 있습니다.</p>
                    <CodeBlock>{`$ npm config set proxy http://proxy.company.com:8080\n$ npm config set https-proxy http://proxy.company.com:8080`}</CodeBlock>
                  </>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    shared.firstRun("macos"),
    shared.basicCommands("macos"),
    shared.ideSetup("macos"),
    shared.faq(),
  ];
}

/* ============================================================
   LINUX STEPS
   ============================================================ */

function buildLinuxSteps(): Step[] {
  return [
    {
      title: "Node.js 설치",
      subtitle: "Linux / WSL2에 Node.js 18+ 설치하기",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">nvm을 사용하면 권한 문제 없이 깔끔하게 설치됩니다.</p>

          <div className="flex items-start gap-3">
            <div className="step-number">1</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">버전 확인 (이미 설치된 경우)</h3>
              <CodeBlock>{`$ node --version\n$ npm --version`}</CodeBlock>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="step-number">2</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">nvm으로 설치 (권장)</h3>
              <CodeBlock>{`$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\n$ source ~/.bashrc\n$ nvm install --lts\n$ nvm use --lts`}</CodeBlock>
            </div>
          </div>

          <CodeBlock title="또는 apt (Ubuntu/Debian)">{`$ curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -\n$ sudo apt-get install -y nodejs`}</CodeBlock>

          <div className="tip-box">
            <p className="text-sm">
              <strong>WSL2 사용자:</strong> VS Code Remote WSL 확장과 함께 사용하면 최고의 환경을 구성할 수 있습니다.
            </p>
          </div>

          {/* ---- 트러블슈팅 ---- */}
          <Troublebox
            items={[
              {
                emoji: "❌",
                title: "nvm: command not found",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">nvm 설치 후 셸을 다시 로드해야 합니다.</p>
                    <CodeBlock>{`$ source ~/.bashrc\n# 또는 터미널을 완전히 닫고 다시 열기\n\n# 그래도 안 되면 직접 추가\n$ export NVM_DIR="$HOME/.nvm"\n$ [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"`}</CodeBlock>
                  </>
                ),
              },
              {
                emoji: "🔧",
                title: "curl: command not found",
                content: (
                  <CodeBlock>{`$ sudo apt-get update && sudo apt-get install -y curl`}</CodeBlock>
                ),
              },
              {
                emoji: "🔢",
                title: "apt로 설치했는데 오래된 버전이 깔려요",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">Ubuntu 기본 저장소의 Node.js는 오래된 버전일 수 있습니다.</p>
                    <CodeBlock>{`# 기존 제거 후 NodeSource로 재설치\n$ sudo apt-get remove -y nodejs\n$ curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -\n$ sudo apt-get install -y nodejs`}</CodeBlock>
                    <p className="text-sm text-gray-500 mt-2">또는 nvm을 사용하면 버전 관리가 훨씬 편합니다.</p>
                  </>
                ),
              },
              {
                emoji: "🐧",
                title: "WSL2에서 네트워크 연결이 안 돼요",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">WSL2의 DNS 설정이 꼬인 경우입니다.</p>
                    <CodeBlock>{`# DNS 수동 설정\n$ echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf`}</CodeBlock>
                  </>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Claude Code 설치",
      subtitle: "npm으로 Claude Code 전역 설치",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="step-number">1</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">npm으로 설치</h3>
              <CodeBlock>{`$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="step-number">2</div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">설치 확인</h3>
              <CodeBlock>{`$ claude --version`}</CodeBlock>
              <div className="success-box mt-2">
                <p className="text-sm">버전 번호가 표시되면 성공입니다!</p>
              </div>
            </div>
          </div>

          {/* ---- 트러블슈팅 ---- */}
          <Troublebox
            items={[
              {
                emoji: "🔒",
                title: "EACCES: permission denied 권한 오류",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">nvm을 사용하면 이 문제가 발생하지 않습니다. nvm 없이 설치했다면:</p>
                    <CodeBlock>{`$ mkdir ~/.npm-global\n$ npm config set prefix '~/.npm-global'\n$ echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc\n$ source ~/.bashrc\n$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
                  </>
                ),
              },
              {
                emoji: "❌",
                title: "command not found: claude",
                content: (
                  <>
                    <p className="text-sm text-gray-600 mb-2">npm 글로벌 bin 경로가 PATH에 없습니다.</p>
                    <CodeBlock>{`$ npm bin -g\n# 출력된 경로를 bashrc에 추가\n$ echo 'export PATH=$(npm bin -g):$PATH' >> ~/.bashrc\n$ source ~/.bashrc`}</CodeBlock>
                  </>
                ),
              },
              {
                emoji: "⚠️",
                title: "gyp ERR! / build-essential 관련 오류",
                content: (
                  <CodeBlock>{`$ sudo apt-get install -y build-essential`}</CodeBlock>
                ),
              },
              {
                emoji: "🌐",
                title: "네트워크 / 프록시 오류",
                content: (
                  <>
                    <CodeBlock>{`$ npm config set proxy http://proxy.company.com:8080\n$ npm config set https-proxy http://proxy.company.com:8080`}</CodeBlock>
                    <p className="text-sm text-gray-500 mt-2">VPN을 일시 해제하거나 방화벽에서 registry.npmjs.org를 허용하세요.</p>
                  </>
                ),
              },
            ]}
          />
        </div>
      ),
    },
    shared.firstRun("linux"),
    shared.basicCommands("linux"),
    shared.ideSetup("linux"),
    shared.faq(),
  ];
}

/* ============================================================
   EXPORT
   ============================================================ */

export function getSteps(os: OS): Step[] {
  switch (os) {
    case "windows":
      return buildWindowsSteps();
    case "macos":
      return buildMacSteps();
    case "linux":
      return buildLinuxSteps();
  }
}

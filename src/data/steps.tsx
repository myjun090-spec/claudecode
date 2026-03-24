import CodeBlock from "@/components/CodeBlock";
import type { ReactNode } from "react";

export type OS = "windows" | "macos" | "linux";

export interface Step {
  title: string;
  subtitle: string;
  content: ReactNode;
}

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
              작업할 프로젝트 폴더로 이동한 후 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-purple-600 text-xs">claude</code> 명령어를 입력합니다.
            </p>
            <CodeBlock>{os === "windows"
              ? `$ cd C:\\Users\\사용자명\\my-project\n$ claude`
              : `$ cd ~/my-project\n$ claude`
            }</CodeBlock>
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
                <CodeBlock>{os === "windows"
                  ? `$ set ANTHROPIC_API_KEY=sk-ant-xxxxx\n$ claude`
                  : `$ export ANTHROPIC_API_KEY=sk-ant-xxxxx\n$ claude`
                }</CodeBlock>
              </div>
            </div>
          </div>
        </div>

        <div className="success-box">
          <p className="text-sm">
            <strong>로그인 성공!</strong> 이제 자연어로 요청하면 됩니다. 예: &quot;이 프로젝트 구조를 설명해줘&quot;
          </p>
        </div>
      </div>
    ),
  }),

  basicCommands: (): Step => ({
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
            프로젝트 루트에 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">CLAUDE.md</code> 파일을 만들면 Claude가 프로젝트 맥락을 이해합니다.
          </p>
          <CodeBlock title="CLAUDE.md 예시">{`# 프로젝트 컨텍스트\n- 기술 스택: Next.js + TypeScript + Tailwind\n- 테스트: Jest 사용\n- 코드 스타일: 한국어 주석 사용\n- 주의: .env 파일 절대 수정하지 말 것`}</CodeBlock>
        </div>
      </div>
    ),
  }),

  ideSetup: (): Step => ({
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
            <li><code className="bg-gray-100 px-1 rounded text-xs">Ctrl+Shift+P</code> → &quot;Claude Code: Open&quot;</li>
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
            IDE 확장과 터미널 <code className="bg-white/50 px-1 rounded">claude</code> 명령어를 동시에 사용할 수 있습니다. 동일한 인증 정보를 공유합니다.
          </p>
        </div>
      </div>
    ),
  }),

  troubleshooting: (os: OS): Step => ({
    title: "오류 해결 가이드",
    subtitle: "자주 발생하는 문제와 해결 방법",
    content: (
      <TroubleshootingContent os={os} />
    ),
  }),

  faq: (): Step => ({
    title: "자주 묻는 질문",
    subtitle: "Claude Code에 대한 궁금증 해결",
    content: (
      <FaqContent />
    ),
  }),
};

function TroubleshootingContent({ os }: { os: OS }) {
  const errors = [
    ...(os === "windows" ? [
      {
        title: "'claude'은(는) 내부 또는 외부 명령이 아닙니다",
        tag: "PATH 오류",
        color: "blue" as const,
        content: (
          <>
            <p className="text-sm text-gray-600 mb-3">npm 글로벌 경로가 PATH에 없을 때 발생합니다.</p>
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
    ] : []),
    ...(os !== "windows" ? [
      {
        title: "command not found: claude",
        tag: "PATH 오류",
        color: "orange" as const,
        content: (
          <>
            <p className="text-sm text-gray-600 mb-3">npm 글로벌 bin 경로가 PATH에 없을 때 발생합니다.</p>
            <CodeBlock>{`# 경로 확인\n$ npm bin -g\n\n# 셸 설정에 추가\n$ echo 'export PATH=$(npm bin -g):$PATH' >> ~/.${os === "macos" ? "zshrc" : "bashrc"}\n$ source ~/.${os === "macos" ? "zshrc" : "bashrc"}`}</CodeBlock>
          </>
        ),
      },
    ] : []),
    {
      title: "EACCES: permission denied",
      tag: "권한 오류",
      color: "red" as const,
      content: (
        <>
          <p className="text-sm text-gray-600 mb-3">글로벌 패키지 설치 시 권한이 부족할 때 발생합니다.</p>
          {os === "windows" ? (
            <div className="warning-box">
              <p className="text-sm"><strong>해결:</strong> PowerShell을 <strong>관리자 권한</strong>으로 실행하세요. (시작 메뉴 → PowerShell 우클릭 → 관리자로 실행)</p>
            </div>
          ) : (
            <>
              <CodeBlock title="방법 1: sudo 사용">{`$ sudo npm install -g @anthropic-ai/claude-code`}</CodeBlock>
              <CodeBlock title="방법 2: npm 경로 변경 (권장)">{`$ mkdir ~/.npm-global\n$ npm config set prefix '~/.npm-global'\n$ echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.${os === "macos" ? "zshrc" : "bashrc"}\n$ source ~/.${os === "macos" ? "zshrc" : "bashrc"}`}</CodeBlock>
            </>
          )}
        </>
      ),
    },
    {
      title: "Node.js version must be >= 18",
      tag: "버전 오류",
      color: "yellow" as const,
      content: (
        <>
          <p className="text-sm text-gray-600 mb-3">Node.js 버전이 18 미만일 때 발생합니다.</p>
          <CodeBlock>{`$ node --version  # 현재 버전 확인\n\n# 최신 LTS 설치\n${os === "windows" ? "$ winget install OpenJS.NodeJS.LTS" : "$ nvm install --lts && nvm use --lts"}`}</CodeBlock>
          <div className="warning-box mt-2">
            <p className="text-sm">설치 후 터미널을 <strong>완전히 종료</strong> 후 다시 열어야 합니다.</p>
          </div>
        </>
      ),
    },
    {
      title: "브라우저가 열리지 않음 (로그인)",
      tag: "로그인",
      color: "purple" as const,
      content: (
        <>
          <p className="text-sm text-gray-600 mb-3">WSL2, SSH, 원격 서버 등 GUI가 없는 환경에서 발생합니다.</p>
          <CodeBlock>{`# 터미널에 표시되는 URL을 복사하여 브라우저에 직접 붙여넣기\n\n# 또는 API 키로 로그인\n$ ${os === "windows" ? "set" : "export"} ANTHROPIC_API_KEY=sk-ant-xxxxx\n$ claude`}</CodeBlock>
        </>
      ),
    },
    {
      title: "ETIMEDOUT / ECONNREFUSED",
      tag: "네트워크",
      color: "red" as const,
      content: (
        <>
          <p className="text-sm text-gray-600 mb-2">네트워크·프록시·방화벽 문제입니다.</p>
          <div className="warning-box">
            <p className="text-sm">
              <strong>확인사항:</strong> 인터넷 연결 / VPN 해제 시도 / 방화벽에서 api.anthropic.com 허용 / 회사 프록시 설정
            </p>
          </div>
          <CodeBlock title="프록시 설정 (필요한 경우)">{`$ npm config set proxy http://proxy.company.com:8080\n$ npm config set https-proxy http://proxy.company.com:8080`}</CodeBlock>
        </>
      ),
    },
  ];

  return <ErrorAccordion errors={errors} />;
}

function ErrorAccordion({ errors }: { errors: Array<{ title: string; tag: string; color: string; content: ReactNode }> }) {
  // Use client-side state via a wrapper
  return <ErrorAccordionInner errors={errors} />;
}

function ErrorAccordionInner({ errors }: { errors: Array<{ title: string; tag: string; color: string; content: ReactNode }> }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const colorMap: Record<string, string> = {
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-600",
  };
  return (
    <div className="space-y-2">
      {errors.map((err, i) => (
        <div key={i} className="faq-item">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full p-3.5 flex items-center gap-2.5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colorMap[err.color] || colorMap.red}`}>
              {err.tag}
            </span>
            <span className="font-medium text-sm flex-1">{err.title}</span>
            <span className={`text-xs transition-transform ${openIdx === i ? "rotate-180" : ""}`}>▼</span>
          </button>
          <div className={`accordion-content ${openIdx === i ? "open" : ""}`}>
            <div className="px-4 pb-4">{err.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

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
            <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">Q</span>
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

// ===== OS-specific step builders =====

function buildWindowsSteps(): Step[] {
  return [
    {
      title: "Node.js 설치",
      subtitle: "Windows에 Node.js 18+ 설치하기",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Claude Code는 Node.js 18 이상이 필요합니다. 아래 방법 중 하나를 선택하세요.</p>

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
              <p className="text-xs text-gray-500 mt-2">또는 <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">nodejs.org</a>에서 LTS 설치 파일 다운로드</p>
            </div>
          </div>

          <div className="warning-box">
            <p className="text-sm"><strong>중요:</strong> 설치 후 터미널을 <strong>완전히 종료</strong>하고 다시 열어야 합니다. 환경 변수가 갱신되지 않으면 node를 찾을 수 없습니다.</p>
          </div>
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

          <div className="error-box">
            <p className="text-sm"><strong>EACCES 권한 오류?</strong> PowerShell을 <strong>관리자 권한</strong>으로 실행하세요. (시작 메뉴 → PowerShell 우클릭 → 관리자로 실행)</p>
          </div>

          <div className="tip-box">
            <p className="text-sm"><strong>참고:</strong> Git Bash보다 PowerShell / Windows Terminal 권장. Windows Defender에서 node를 예외 추가해두면 좋습니다.</p>
          </div>
        </div>
      ),
    },
    shared.firstRun("windows"),
    shared.basicCommands(),
    shared.ideSetup(),
    shared.troubleshooting("windows"),
    shared.faq(),
  ];
}

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
            <p className="text-sm"><strong>nvm 사용자라면:</strong> <code className="bg-white/50 px-1 rounded text-xs">nvm install --lts</code>로 설치할 수 있습니다.</p>
          </div>
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

          <div className="error-box">
            <p className="text-sm"><strong>EACCES 권한 오류?</strong></p>
          </div>
          <CodeBlock title="방법 1: sudo 사용">{`$ sudo npm install -g @anthropic-ai/claude-code`}</CodeBlock>
          <CodeBlock title="방법 2: 소유권 변경 (권장)">{`$ sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`}</CodeBlock>
        </div>
      ),
    },
    shared.firstRun("macos"),
    shared.basicCommands(),
    shared.ideSetup(),
    shared.troubleshooting("macos"),
    shared.faq(),
  ];
}

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
            <p className="text-sm"><strong>WSL2 사용자:</strong> VS Code Remote WSL 확장과 함께 사용하면 최고의 환경을 구성할 수 있습니다.</p>
          </div>
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

          <div className="error-box">
            <p className="text-sm"><strong>EACCES 오류?</strong> nvm을 사용하면 자동 해결됩니다. nvm 없이 설치했다면:</p>
          </div>
          <CodeBlock title="npm 글로벌 디렉토리 변경">{`$ mkdir ~/.npm-global\n$ npm config set prefix '~/.npm-global'\n$ echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc\n$ source ~/.bashrc\n$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
        </div>
      ),
    },
    shared.firstRun("linux"),
    shared.basicCommands(),
    shared.ideSetup(),
    shared.troubleshooting("linux"),
    shared.faq(),
  ];
}

export function getSteps(os: OS): Step[] {
  switch (os) {
    case "windows": return buildWindowsSteps();
    case "macos": return buildMacSteps();
    case "linux": return buildLinuxSteps();
  }
}

// Need to import useState for inner components
import { useState } from "react";

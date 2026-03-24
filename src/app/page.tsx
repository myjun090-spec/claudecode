"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CodeBlock from "@/components/CodeBlock";

type OS = "windows" | "macos" | "linux";

const osLabels: Record<OS, string> = {
  windows: "🪟 Windows",
  macos: "🍎 macOS",
  linux: "🐧 Linux",
};

export default function Home() {
  const [selectedOS, setSelectedOS] = useState<OS>("windows");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openError, setOpenError] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 max-w-4xl mx-auto px-6 lg:px-12 py-8">
        {/* Hero */}
        <section id="hero" className="hero-gradient rounded-2xl p-8 lg:p-12 mb-12">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-purple-600 mb-4 border border-purple-100">
              2025년 최신 가이드
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="gradient-text">Claude Code</span>
              <br />
              누구나 쉽게 시작하기
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              AI 에이전틱 코딩 도구 Claude Code를 설치하고 시작하는 완벽한 가이드입니다.
              <br />
              Windows, macOS, Linux 모든 환경을 지원합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#install"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-purple-200 hover:shadow-xl transition-all"
              >
                설치 시작하기
              </a>
              <a
                href="#errors"
                className="px-6 py-3 bg-white text-purple-600 border border-purple-200 rounded-xl font-medium hover:bg-purple-50 transition-all"
              >
                오류 해결하기
              </a>
            </div>
          </div>
        </section>

        {/* What is Claude Code */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Claude Code란?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "🤖",
                title: "AI 코딩 에이전트",
                desc: "Anthropic이 만든 터미널 기반 AI 코딩 도구로, 자연어로 코드를 작성·수정·디버깅합니다.",
              },
              {
                icon: "💻",
                title: "터미널에서 실행",
                desc: "별도의 GUI 없이 터미널(명령줄)에서 직접 실행됩니다. VS Code, Cursor 등 IDE와도 연동 가능합니다.",
              },
              {
                icon: "🌍",
                title: "크로스 플랫폼",
                desc: "Windows, macOS, Linux 모두 지원합니다. Node.js만 설치하면 어디서든 사용할 수 있습니다.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-hover bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prerequisites */}
        <section id="prerequisites" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">사전 준비</h2>

          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="step-number">1</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Node.js 18+ 설치</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Claude Code는 Node.js 18 이상이 필요합니다. 이미 설치되어 있다면 버전을 확인하세요.
                  </p>
                  <CodeBlock title="버전 확인">{`$ node --version\n$ npm --version`}</CodeBlock>
                  <div className="warning-box mt-3">
                    <p className="text-sm">
                      <strong>v18 미만이라면?</strong>{" "}
                      <a
                        href="https://nodejs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 underline"
                      >
                        nodejs.org
                      </a>
                      에서 LTS 버전을 다운로드하세요. 기존 버전이 있다면 먼저 삭제 후 재설치를 권장합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="step-number">2</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">터미널 준비</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    각 운영체제별 권장 터미널입니다.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="font-semibold text-sm mb-1">🪟 Windows</p>
                      <p className="text-xs text-gray-600">
                        PowerShell, Windows Terminal, 또는 Git Bash 사용
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="font-semibold text-sm mb-1">🍎 macOS</p>
                      <p className="text-xs text-gray-600">
                        기본 Terminal.app 또는 iTerm2 사용
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <p className="font-semibold text-sm mb-1">🐧 Linux</p>
                      <p className="text-xs text-gray-600">
                        기본 터미널 에뮬레이터 (gnome-terminal 등) 사용
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="step-number">3</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Anthropic 계정 & 구독</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Claude Code를 사용하려면 다음 중 하나가 필요합니다:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span><strong>Claude Pro / Max 구독</strong> — claude.ai에서 구독 (가장 간편)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      <span><strong>Anthropic API 키</strong> — console.anthropic.com에서 발급</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span><strong>Amazon Bedrock / Google Vertex</strong> — 클라우드 제공자 연동</span>
                    </div>
                  </div>
                  <div className="tip-box mt-3">
                    <p className="text-sm">
                      <strong>팁:</strong> 처음 시작한다면 Claude Max 구독이 가장 간편합니다. 월 $100~$200로 무제한 사용 가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Install Section */}
        <section id="install" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">설치하기</h2>

          {/* OS Tabs */}
          <div className="flex gap-2 mb-6">
            {(Object.keys(osLabels) as OS[]).map((os) => (
              <button
                key={os}
                onClick={() => setSelectedOS(os)}
                className={`os-tab px-5 py-3 rounded-xl text-sm font-medium ${
                  selectedOS === os ? "active" : "bg-white"
                }`}
              >
                {osLabels[os]}
              </button>
            ))}
          </div>

          {/* Windows */}
          {selectedOS === "windows" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Node.js 설치 (Windows)</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      nodejs.org에서 LTS 버전 다운로드 후 설치하거나, winget을 사용합니다.
                    </p>
                    <CodeBlock title="winget으로 설치">{`$ winget install OpenJS.NodeJS.LTS`}</CodeBlock>
                    <CodeBlock title="또는 Chocolatey로 설치">{`$ choco install nodejs-lts`}</CodeBlock>
                    <div className="warning-box mt-3">
                      <p className="text-sm">
                        <strong>주의:</strong> 설치 후 터미널을 <strong>완전히 종료</strong>하고 다시 열어야 합니다.
                        환경 변수가 갱신되지 않으면 node 명령어를 찾을 수 없습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Claude Code 설치</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      npm으로 전역 설치합니다.
                    </p>
                    <CodeBlock>{`$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
                    <div className="error-box mt-3">
                      <p className="text-sm">
                        <strong>EACCES 권한 오류가 나타나면?</strong><br />
                        PowerShell을 <strong>관리자 권한</strong>으로 실행하세요.
                        (시작 메뉴 → PowerShell 우클릭 → 관리자로 실행)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">설치 확인</h3>
                    <CodeBlock>{`$ claude --version`}</CodeBlock>
                    <div className="success-box mt-3">
                      <p className="text-sm">
                        버전 번호가 표시되면 설치 성공입니다! 🎉
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="warning-box">
                <p className="text-sm font-semibold mb-1">Windows 사용 시 알아두세요</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
                  <li>Git Bash보다 <strong>PowerShell</strong> 또는 <strong>Windows Terminal</strong> 권장</li>
                  <li>WSL2 환경에서도 사용 가능 (Linux 탭 참고)</li>
                  <li>Windows Defender가 node 프로세스를 차단할 수 있으니 예외 추가 권장</li>
                </ul>
              </div>
            </div>
          )}

          {/* macOS */}
          {selectedOS === "macos" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Node.js 설치 (macOS)</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Homebrew를 사용하는 것이 가장 편리합니다.
                    </p>
                    <CodeBlock title="Homebrew 설치 (없는 경우)">{`$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}</CodeBlock>
                    <CodeBlock title="Node.js 설치">{`$ brew install node`}</CodeBlock>
                    <div className="tip-box mt-3">
                      <p className="text-sm">
                        <strong>nvm 사용자라면:</strong> <code className="bg-gray-100 px-1 rounded">nvm install --lts</code>로 설치할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Claude Code 설치</h3>
                    <CodeBlock>{`$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
                    <div className="error-box mt-3">
                      <p className="text-sm">
                        <strong>EACCES 권한 오류가 나타나면?</strong><br />
                        앞에 <code className="bg-gray-100 px-1 rounded">sudo</code>를 붙이거나, npm 디렉토리 권한을 변경하세요:
                      </p>
                    </div>
                    <CodeBlock title="권한 오류 해결">{`$ sudo npm install -g @anthropic-ai/claude-code\n# 또는 npm 디렉토리 소유권 변경\n$ sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`}</CodeBlock>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">설치 확인</h3>
                    <CodeBlock>{`$ claude --version`}</CodeBlock>
                    <div className="success-box mt-3">
                      <p className="text-sm">
                        버전 번호가 표시되면 설치 성공입니다! 🎉
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Linux */}
          {selectedOS === "linux" && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">1</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Node.js 설치 (Linux / WSL2)</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      NodeSource 또는 nvm을 사용합니다.
                    </p>
                    <CodeBlock title="nvm으로 설치 (권장)">{`$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\n$ source ~/.bashrc\n$ nvm install --lts\n$ nvm use --lts`}</CodeBlock>
                    <CodeBlock title="또는 apt로 설치 (Ubuntu/Debian)">{`$ curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -\n$ sudo apt-get install -y nodejs`}</CodeBlock>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">2</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Claude Code 설치</h3>
                    <CodeBlock>{`$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
                    <div className="error-box mt-3">
                      <p className="text-sm">
                        <strong>EACCES 오류 해결:</strong> nvm을 사용하면 sudo 없이 글로벌 패키지 설치가 가능합니다.
                        nvm 없이 설치했다면:
                      </p>
                    </div>
                    <CodeBlock title="npm 글로벌 디렉토리 변경">{`$ mkdir ~/.npm-global\n$ npm config set prefix '~/.npm-global'\n$ echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc\n$ source ~/.bashrc\n$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="step-number">3</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">설치 확인</h3>
                    <CodeBlock>{`$ claude --version`}</CodeBlock>
                    <div className="success-box mt-3">
                      <p className="text-sm">
                        버전 번호가 표시되면 설치 성공입니다! 🎉
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tip-box">
                <p className="text-sm font-semibold mb-1">WSL2 사용자 팁</p>
                <p className="text-sm text-gray-700">
                  Windows에서 WSL2를 쓴다면 Linux 방식으로 설치하세요.
                  VS Code Remote WSL 확장과 함께 사용하면 최고의 환경을 구성할 수 있습니다.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* First Run */}
        <section id="first-run" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">첫 실행 & 로그인</h2>

          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="step-number">1</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Claude Code 실행</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    작업할 프로젝트 폴더로 이동한 후 실행합니다.
                  </p>
                  <CodeBlock>{`$ cd /your/project/folder\n$ claude`}</CodeBlock>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="step-number">2</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">로그인 방법 선택</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    처음 실행하면 로그인 방법을 선택하는 화면이 나타납니다.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="font-semibold text-sm mb-1">방법 1: Claude 계정으로 로그인 (권장)</p>
                      <p className="text-xs text-gray-600 mb-2">
                        브라우저가 열리며 claude.ai 계정으로 로그인합니다. Pro/Max 구독자에게 적합합니다.
                      </p>
                      <CodeBlock>{`# 터미널에서 Enter 누르면 브라우저가 자동으로 열립니다\n# 로그인 후 터미널로 돌아오면 자동 연결됩니다`}</CodeBlock>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <p className="font-semibold text-sm mb-1">방법 2: API 키 사용</p>
                      <p className="text-xs text-gray-600 mb-2">
                        Anthropic API 키를 직접 입력합니다.
                      </p>
                      <CodeBlock>{`# 환경 변수로 설정\n$ export ANTHROPIC_API_KEY=sk-ant-xxxxx\n$ claude`}</CodeBlock>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="step-number">3</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">첫 대화 시작</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    로그인이 완료되면 프롬프트가 나타납니다. 자연어로 요청하세요!
                  </p>
                  <CodeBlock>{`> 이 프로젝트의 구조를 설명해줘\n> README.md를 한국어로 작성해줘\n> 이 버그를 수정해줘: [에러 메시지 붙여넣기]`}</CodeBlock>
                  <div className="success-box mt-3">
                    <p className="text-sm">
                      Claude Code는 파일 읽기/쓰기, 명령어 실행 등을 자동으로 수행합니다.
                      각 작업 전에 사용자 확인을 요청하므로 안심하고 사용하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-3">알아두면 좋은 기본 명령어</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { cmd: "/help", desc: "도움말 보기" },
                  { cmd: "/clear", desc: "대화 초기화" },
                  { cmd: "/compact", desc: "컨텍스트 압축" },
                  { cmd: "/cost", desc: "사용 비용 확인" },
                  { cmd: "/model", desc: "모델 변경" },
                  { cmd: "Esc", desc: "현재 작업 중지" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <code className="bg-white px-2 py-1 rounded text-purple-600 text-xs font-bold border">
                      {item.cmd}
                    </code>
                    <span className="text-sm text-gray-600">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* IDE Integration */}
        <section id="ide" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">IDE 연동</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card-hover bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-lg">
                  📘
                </div>
                <h3 className="font-bold">VS Code</h3>
              </div>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>VS Code 마켓플레이스에서 <strong>&quot;Claude Code&quot;</strong> 검색</li>
                <li>확장 프로그램 설치</li>
                <li><code className="bg-gray-100 px-1 rounded">Ctrl+Shift+P</code> → &quot;Claude Code: Open&quot;</li>
                <li>IDE 내에서 Claude Code 패널 사용</li>
              </ol>
              <div className="tip-box mt-4">
                <p className="text-xs">터미널에서 <code className="bg-white/50 px-1 rounded">claude</code> 명령으로도 동시에 사용할 수 있습니다.</p>
              </div>
            </div>

            <div className="card-hover bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-lg">
                  ✨
                </div>
                <h3 className="font-bold">JetBrains IDE</h3>
              </div>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Settings → Plugins에서 <strong>&quot;Claude Code&quot;</strong> 검색</li>
                <li>플러그인 설치 및 IDE 재시작</li>
                <li>하단 패널에서 Claude Code 탭 확인</li>
                <li>IntelliJ, WebStorm, PyCharm 등 모든 JetBrains IDE 지원</li>
              </ol>
              <div className="tip-box mt-4">
                <p className="text-xs">터미널에서 설치한 Claude Code와 동일한 인증 정보를 사용합니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Error Troubleshooting */}
        <section id="errors" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">오류 해결 가이드</h2>
          <p className="text-gray-600 text-sm mb-6">
            설치 및 실행 중 자주 발생하는 오류와 해결 방법입니다. 클릭하여 해결 방법을 확인하세요.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "npm ERR! EACCES: permission denied",
                os: "공통",
                color: "red",
                content: (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      글로벌 패키지 설치 시 권한이 부족할 때 발생합니다.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">해결 방법:</p>
                      <CodeBlock title="방법 1: sudo 사용 (macOS/Linux)">{`$ sudo npm install -g @anthropic-ai/claude-code`}</CodeBlock>
                      <CodeBlock title="방법 2: npm 글로벌 경로 변경 (권장)">{`$ mkdir ~/.npm-global\n$ npm config set prefix '~/.npm-global'\n$ export PATH=~/.npm-global/bin:$PATH\n# 위 export를 ~/.bashrc 또는 ~/.zshrc에 추가`}</CodeBlock>
                      <CodeBlock title="방법 3: Windows - 관리자 권한 PowerShell">{`# PowerShell을 관리자 권한으로 실행 후\n$ npm install -g @anthropic-ai/claude-code`}</CodeBlock>
                    </div>
                  </div>
                ),
              },
              {
                title: "'claude'은(는) 내부 또는 외부 명령... 이 아닙니다",
                os: "Windows",
                color: "blue",
                content: (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      npm 글로벌 bin 경로가 시스템 PATH에 등록되지 않았을 때 발생합니다.
                    </p>
                    <CodeBlock title="npm 글로벌 경로 확인">{`$ npm config get prefix`}</CodeBlock>
                    <p className="text-sm text-gray-600 my-2">
                      출력된 경로에 <code className="bg-gray-100 px-1 rounded">\bin</code>을 추가하여 시스템 환경 변수 PATH에 등록합니다.
                    </p>
                    <div className="warning-box">
                      <p className="text-sm">
                        <strong>해결 순서:</strong><br />
                        1. 시스템 환경 변수 → PATH → 편집<br />
                        2. npm prefix 경로 추가 (보통 <code className="bg-white/50 px-1 rounded">C:\Users\사용자명\AppData\Roaming\npm</code>)<br />
                        3. 터미널을 <strong>완전히 종료</strong> 후 다시 열기
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                title: "command not found: claude",
                os: "macOS / Linux",
                color: "orange",
                content: (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      PATH에 npm 글로벌 bin 경로가 없을 때 발생합니다.
                    </p>
                    <CodeBlock title="경로 확인 및 수정">{`# npm 글로벌 bin 경로 확인\n$ npm bin -g\n\n# 출력된 경로를 셸 설정에 추가\n$ echo 'export PATH=$(npm bin -g):$PATH' >> ~/.zshrc\n$ source ~/.zshrc`}</CodeBlock>
                    <div className="tip-box mt-2">
                      <p className="text-sm">
                        Bash 사용자는 <code className="bg-white/50 px-1 rounded">~/.bashrc</code>,
                        Zsh 사용자는 <code className="bg-white/50 px-1 rounded">~/.zshrc</code>에 추가하세요.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                title: "Error: Node.js version must be >= 18",
                os: "공통",
                color: "yellow",
                content: (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      Node.js 버전이 18 미만일 때 발생합니다.
                    </p>
                    <CodeBlock title="현재 버전 확인">{`$ node --version`}</CodeBlock>
                    <CodeBlock title="nvm으로 최신 LTS 설치">{`$ nvm install --lts\n$ nvm use --lts\n$ node --version  # 18 이상 확인`}</CodeBlock>
                    <div className="warning-box mt-2">
                      <p className="text-sm">
                        nvm이 없다면 nodejs.org에서 직접 최신 LTS 버전을 다운로드하세요.
                        기존 Node.js는 먼저 삭제하는 것이 좋습니다.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                title: "로그인 시 브라우저가 열리지 않음",
                os: "공통",
                color: "purple",
                content: (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      WSL2, SSH, 원격 서버 등 GUI가 없는 환경에서 발생할 수 있습니다.
                    </p>
                    <CodeBlock title="수동 로그인">{`# 터미널에 표시되는 URL을 복사하여\n# 직접 브라우저에 붙여넣기 합니다\n\n# 또는 API 키로 로그인\n$ export ANTHROPIC_API_KEY=sk-ant-xxxxx\n$ claude`}</CodeBlock>
                  </div>
                ),
              },
              {
                title: "ETIMEDOUT / ECONNREFUSED 네트워크 오류",
                os: "공통",
                color: "red",
                content: (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      네트워크 연결 또는 프록시/방화벽 문제입니다.
                    </p>
                    <div className="space-y-2">
                      <CodeBlock title="프록시 설정 (회사 네트워크)">{`$ npm config set proxy http://proxy.company.com:8080\n$ npm config set https-proxy http://proxy.company.com:8080`}</CodeBlock>
                      <div className="warning-box">
                        <p className="text-sm">
                          <strong>확인할 것:</strong><br />
                          • 인터넷 연결 상태<br />
                          • VPN 연결 여부 (일부 VPN이 차단할 수 있음)<br />
                          • 방화벽에서 api.anthropic.com 허용 여부<br />
                          • 회사 프록시 설정
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                title: "npm WARN deprecated / gyp ERR! 빌드 오류",
                os: "공통",
                color: "yellow",
                content: (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      네이티브 모듈 빌드 도구가 없을 때 발생할 수 있습니다.
                    </p>
                    <CodeBlock title="Windows: 빌드 도구 설치">{`$ npm install -g windows-build-tools`}</CodeBlock>
                    <CodeBlock title="macOS: Xcode CLI 설치">{`$ xcode-select --install`}</CodeBlock>
                    <CodeBlock title="Linux: 빌드 패키지 설치">{`$ sudo apt-get install build-essential`}</CodeBlock>
                    <div className="tip-box mt-2">
                      <p className="text-sm">
                        WARN deprecated 메시지는 대부분 무시해도 됩니다.
                        ERR 메시지만 주의하세요.
                      </p>
                    </div>
                  </div>
                ),
              },
            ].map((error, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenError(openError === i ? null : i)}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50"
                >
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      error.color === "red"
                        ? "bg-red-100 text-red-600"
                        : error.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : error.color === "orange"
                        ? "bg-orange-100 text-orange-600"
                        : error.color === "yellow"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {error.os}
                  </span>
                  <span className="font-medium text-sm flex-1">{error.title}</span>
                  <span className={`transition-transform ${openError === i ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                <div className={`accordion-content ${openError === i ? "open" : ""}`}>
                  <div className="px-4 pb-4">{error.content}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section id="tips" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">꿀팁 모음</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: "📁",
                title: "CLAUDE.md 파일 활용",
                desc: "프로젝트 루트에 CLAUDE.md 파일을 만들면 Claude Code가 프로젝트 맥락을 이해합니다. 코딩 규칙, 기술 스택, 주의사항 등을 적어두세요.",
              },
              {
                icon: "⚡",
                title: "/compact로 속도 유지",
                desc: "대화가 길어지면 컨텍스트가 커져 응답이 느려집니다. /compact 명령으로 대화를 압축하면 속도가 개선됩니다.",
              },
              {
                icon: "🔒",
                title: "권한 모드 이해하기",
                desc: "Claude Code는 파일 수정, 명령 실행 전에 허락을 구합니다. 신뢰할 수 있는 작업은 자동 승인하도록 설정할 수 있습니다.",
              },
              {
                icon: "🔄",
                title: "항상 최신 버전 유지",
                desc: "Claude Code는 빠르게 업데이트됩니다. 주기적으로 npm update -g @anthropic-ai/claude-code를 실행하세요.",
              },
              {
                icon: "🎯",
                title: "구체적인 프롬프트 작성",
                desc: "\"코드 고쳐줘\"보다 \"src/api.ts의 fetchUser 함수에서 null 체크 추가해줘\"처럼 구체적으로 요청하면 훨씬 좋은 결과를 얻습니다.",
              },
              {
                icon: "💰",
                title: "비용 관리",
                desc: "/cost 명령으로 현재 세션의 토큰 사용량과 비용을 확인할 수 있습니다. Max 구독이라면 비용 걱정 없이 사용할 수 있습니다.",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="card-hover bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="text-2xl mb-3">{tip.icon}</div>
                <h3 className="font-bold mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-12">
          <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>

          <div className="space-y-3">
            {[
              {
                q: "Claude Code는 무료인가요?",
                a: "Claude Code 자체는 무료로 설치할 수 있지만, 사용하려면 Claude Pro($20/월), Max($100~$200/월) 구독이나 Anthropic API 크레딧이 필요합니다. API 사용 시 토큰 사용량에 따라 과금됩니다.",
              },
              {
                q: "인터넷 없이 사용할 수 있나요?",
                a: "아니요, Claude Code는 Anthropic의 AI 모델에 요청을 보내야 하므로 인터넷 연결이 필수입니다.",
              },
              {
                q: "내 코드가 Anthropic 서버에 저장되나요?",
                a: "Claude Code가 보내는 코드 데이터는 모델 학습에 사용되지 않습니다. 다만 대화 내용은 일시적으로 서버를 통과하므로, 민감한 자격 증명(API 키, 비밀번호 등)은 직접 입력하지 않는 것이 좋습니다.",
              },
              {
                q: "어떤 프로그래밍 언어를 지원하나요?",
                a: "Claude Code는 특정 언어에 제한되지 않습니다. Python, JavaScript, TypeScript, Java, Go, Rust, C++, Swift 등 대부분의 프로그래밍 언어를 지원합니다.",
              },
              {
                q: "Git이 필수인가요?",
                a: "필수는 아니지만 강력히 권장됩니다. Claude Code는 Git 연동 기능(커밋, PR 생성 등)을 제공하며, Git이 있으면 변경 사항을 안전하게 관리할 수 있습니다.",
              },
              {
                q: "기존 프로젝트에서 바로 사용할 수 있나요?",
                a: "네! 프로젝트 폴더에서 claude 명령어를 실행하면 바로 해당 프로젝트의 파일들을 읽고 수정할 수 있습니다. 새 프로젝트 생성도 가능합니다.",
              },
              {
                q: "Claude Code vs GitHub Copilot 차이점은?",
                a: "Copilot은 주로 코드 자동완성에 특화되어 있지만, Claude Code는 에이전틱 방식으로 동작합니다. 파일 생성/수정, 명령어 실행, Git 작업 등을 자율적으로 수행할 수 있어 더 복잡한 작업에 적합합니다.",
              },
            ].map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50"
                >
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    Q
                  </span>
                  <span className="font-medium text-sm flex-1">{item.q}</span>
                  <span className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                <div className={`accordion-content ${openFaq === i ? "open" : ""}`}>
                  <div className="px-4 pb-4 pl-13">
                    <p className="text-sm text-gray-600 leading-relaxed ml-9">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 pt-8 pb-12 text-center">
          <p className="text-sm text-gray-400">
            이 가이드는 Claude Code 사용자 커뮤니티를 위해 만들어졌습니다.
          </p>
          <p className="text-xs text-gray-300 mt-2">
            Claude Code는 Anthropic의 제품입니다. 이 사이트는 공식 사이트가 아닙니다.
          </p>
        </footer>
      </main>
    </div>
  );
}

// chapter2. JSX 소개

// 1. JSX의 중괄호 안에는 유효한 모든 JavaScript 표현식을 넣을 수 있습니다.
const name1 = "Josh Perez";

// 2. 아래 예시에서는 JavaScript 함수 호출의 결과인 formatName(user)을 <h1> 엘리먼트에 포함했습니다.
function formatName(user) {
    return user.firstName + " " + user.lastName;
}

const user = {
    firstName: "Harper",
    lastName: "Perez",
};

const element1 = <h1>Hello, {formatName(user)}!</h1>;

ReactDOM.render(element, document.getElementById("root"));

/* 3. JSX도 표현식입니다.

컴파일이 끝나면, JSX 표현식이 정규 JavaScript 함수 호출이 되고 JavaScript 객체로 인식됩니다.

즉, JSX를 if 구문 및 for loop 안에 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로부터 반환할 수 있습니다.*/
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}

// 4. 속성에 따옴표를 이용해 문자열 리터럴을 정의할 수 있습니다.
const element2 = <div tabIndex="0"></div>;
// 5. 중괄호를 사용하여 어트리뷰트에 JavaScript 표현식을 삽입할 수도 있습니다.
// 어트리뷰트에 JavaScript 표현식을 삽입할 때 중괄호 주변에 따옴표를 입력하지 마세요.
// 따옴표(문자열 값에 사용) 또는 중괄호(표현식에 사용) 중 하나만 사용하고, 동일한 어트리뷰트에 두 가지를 동시에 사용하면 안 됩니다.
const element3 = <img src={user.avatarUrl}></img>;

// 6. JSX는 Injection Attack을 방지합니다.(사용자 입력을 삽입하는 것은 안전합니다.)
// 기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프 하므로, 애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않습니다.

const title = response.potentiallyMaliciousInput;
// 이것은 안전합니다.
const element4 = <h1>{title}</h1>;

// 7. JSX는 객체를 표현합니다
// 다음 두 예시는 동일합니다.
const element5 = <h1 className="greeting">Hello, world!</h1>;

// Babel은 JSX를 React.createElement() 호출로 컴파일
const element6 = React.createElement("h1", { className: "greeting" }, "Hello, world!");

// React.createElement()는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행하며, 기본적으로 다음과 같은 객체를 생성합니다.
// 주의: 다음 구조는 단순화되었습니다
/* 이러한 객체를 "React 엘리먼트"라고 하며, 이를 화면에 표시하려는 항목에 대한 
설명이라고 생각할 수 있습니다. React는 이러한 객체를 읽은 후
DOM을 구성하고 최신으로 유지하는 데 이러한 객체를 사용합니다. */
const element7 = {
    type: "h1",
    props: {
        className: "greeting",
        children: "Hello, world!",
    },
};

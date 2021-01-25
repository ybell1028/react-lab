import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

// 사용 예제: <ShoppingList name="Mark" />

// class Square extends React.Component {
//   /* 무언가를 “기억하기”위해 component는 state를 사용합니다.
// React 컴포넌트는 생성자에 this.state를 설정하는 것으로 state를 가질 수 있습니다. */
//   constructor(props) {
//     /* 주의
//     JavaScript 클래스에서 하위 클래스의 생성자를 정의할 때 항상 super를 호출해야합니다.
//     모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출 구문부터 작성해야 합니다.*/
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }

//   render() {
//     /* Square의 render 함수 내부에서 onClick 핸들러를 통해 this.setState를 호출하는 것으로
//         React에게 <button>을 클릭할 때 Square가 다시 렌더링해야 한다고 알릴 수 있습니다. */
//     return (
//       <button
//         /* 버튼을 클릭하면 React는 Square의 render() 함수에 정의된 onClick 이벤트 핸들러를 호출합니다.
//         이벤트 핸들러는 this.props.onClick()를 호출합니다. Square의 onClick prop은 Board에서 정의되었습니다.
//         Board에서 Square로 onClick={() => this.handleClick(i)}를 전달했기 때문에 Square를 클릭하면 this.handleClick(i)를 호출합니다. */
//         className="square"
//         onClick={() => {
//           this.props.onclick({ value: "X" });
//         }}
//       >
//         {this.props.value}
//       </button>
//       // 컴포넌트에서 setState를 호출하면 React는 자동으로 컴포넌트 내부의 자식 컴포넌트 역시 업데이트합니다.
//     );
//   }
// }

function Square(props) {
    /* Square를 함수 컴포넌트로 수정했을 때 onClick={() => this.props.onClick()}을
     onClick={props.onClick}로 간결하게 작성했습니다. 양쪽 모두 괄호가 사라진 것에 주목해주세요. */
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // Square를 클릭할 때 현재 state 값을 표시하기 위해 render 함수를 변경할 것입니다.

    /* 여러개의 자식으로부터 데이터를 모으거나 두 개의 자식 컴포넌트들이 서로 통신하게 하려면
    부모 컴포넌트에 공유 state를 정의해야 합니다. 부모 컴포넌트는 props를 사용하여 
    자식 컴포넌트에 state를 다시 전달할 수 있습니다. 
    이것은 자식 컴포넌트들이 서로 또는 부모 컴포넌트와 동기화 하도록 만듭니다.*/

    // handleClick(i) {
    //     // 누군가가 승리하거나 Square가 이미 채워졌다면 Board의 handleClick 함수가 클릭을 무시하도록 변경하겠습니다.
    //     const squares = this.state.squares.slice(); // 배열로 만들어주기
    //     if (calculateWinner(squares) || squares[i]) {
    //         // calculateWinner의 값이 null이 아니거나 click 이벤트가 발생한 square[i]의 값이 null이 아니라면(O 또는 X)
    //         console.log(squares[i]);
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? "X" : "O";
    //     this.setState({ squares: squares, xIsNext: !this.state.xIsNext }); // 앞에있는 squares는 state에 있는것이고 뒤에 있는 것은 handleClick에서 선언한것
    //     // Board의 상태가 변화할 때 Square 컴포넌트는 자동으로 다시 렌더링합니다.
    //     /* Square 컴포넌트가 더 이상 state를 유지하지 않기 때문에 Square 컴포넌트는
    //     Board 컴포넌트에서 값을 받아 클릭될 때 Board 컴포넌트로 정보를 전달합니다.
    //     React 용어로 Square 컴포넌트는 이제 제어되는 컴포넌트입니다. Board는 이들을 완전히 제어합니다. */
    // }

    renderSquare(i) {
        /* 처음에는 모든 Square에서 0부터 8까지 숫자를 보여주기 위해 Board에서 value prop을 자식으로 전달했습니다.
        또, 이전 단계에서는 숫자를 Square의 자체 state에 따라 “X” 표시로 바꾸었습니다.
        그렇기 때문에 현재 Square는 Board에서 전달한 value prop을 무시하고 있습니다.
        이제 prop을 전달하는 방법을 다시 사용할 것입니다.
        각 Square에게 현재 값('X', 'O', 또는 null)을 표현하도록 Board를 수정할 것입니다. */
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
        /* Square는 이제 빈 사각형에 'X', 'O', 또는 null인 value prop을 받습니다.
        Board 컴포넌트는 어떤 사각형이 채워졌는지를 여부를 관리하므로 Square가 Board를 변경할 방법이 필요합니다.
        컴포넌트는 자신이 정의한 state에만 접근할 수 있으므로 Square에서 Board의 state를 직접 변경할 수 없습니다.
        대신에 Board에서 Square로 함수를 전달하고 Square는 사각형을 클릭할 때 함수를 호출할 것입니다. */

        // 이제 Board에서 Square로 value와 onClick 두 개의 props를 전달하였습니다. onClick prop은 Square를 클릭하면 호출되는 함수입니다
    }

    render() {
        // 3. 이제 Game 컴포넌트가 게임의 상태를 렌더링하기 때문에 Board의
        // render 함수에서 중복되는 코드를 제거할 수 있습니다.

        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = "Winner: " + winner;
        // } else {
        //     status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
        // }

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    //1. 다음으로 Game 컴포넌트에서 Board 컴포넌트로 squares와 onClick props를 전달하겠습니다.
    //2. Game 컴포넌트의 render 함수를 가장 최근 기록을 사용하도록 업데이트하여 게임의 상태를 확인하고 표시하겠습니다.
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    //4. 마지막으로 handleClick 함수를 Board에서 Game 컴포넌트로 이동하겠습니다.
    // 또한 Game 컴포넌트의 state가 다르게 구성되어있기 때문에 handleClick을 수정해야 합니다.

    handleClick(i) {
        /* 새로운 이동을 만든 후에 this.setState의 인자로 stepNumber: history.length를 추가하여
         stepNumber를 업데이트 해아합니다. 이를 통해 새로운 이동이 생성된 후에 이동이 그대로 남아있는 것을 방지합니다.
        또한 this.state.history를 this.state.history.slice(0, this.state.stepNumber + 1)로 교체할 것입니다. */
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        // console.log("history : " + history[i].squares);
        const current = history[history.length - 1]; //history 배열 가장 마지막에 있는 것을 current에 주소복사
        const squares = current.squares.slice(); // 불변성 유지를 위해 slice() 메소드 사용
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            // 5. push() 함수와 같이 더 익숙한 방식과 달리 concat() 함수는 기존 배열을 변경하지 않기 때문에 이를 더 권장합니다.
            // concat() 메서드는 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다.
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: history.length, // 8. jumpTo를 구현하기 전에 Game 컴포넌트의 state에 stepNumber를 추가하여 현재 진행 중인 단계를 표시
            xIsNext: !this.state.xIsNext,
        });
        console.log(this.state.history);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0, // 짝수면 X(true), 홀수면 O(false)
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]; // 3. 마지막 이동을 렌더링하는 대신 stepNumber에 맞는 현재 선택된 이동을 렌더링할 것입니다.
        const winner = calculateWinner(current.squares);

        // 6. React 엘리먼트
        /* 7. 틱택토 게임 기록의 각각 이동마다 버튼 <button>을 포함하는 리스트 아이템 <li>를 생성합니다.
        버튼은 this.jumpTo() 함수를 호출하는 onClick 핸들러를 가지고 있습니다.
        아직은 jumpTo() 함수를 구현하지 않았습니다.
        지금 상태에서 게임의 이동 목록은 아래와 같은 경고를 개발자 도구 콘솔에 표시합니다. */
        const moves = history.map((step, move) => {
            console.log(history.length);
            const desc = move ? "Go to move #" + move : "Go to game start";
            // 8. 이동은 순서가 바뀌거나 삭제되거나 중간에 삽입될 수 없기 때문에 이동의 인덱스를 키로 사용해도 안전합니다.
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

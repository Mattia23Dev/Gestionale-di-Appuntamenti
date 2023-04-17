import React from "react";
import { useDispatch } from "react-redux";
import ACTION_CALM_NOT_IN_CART from "../../../../actions/InCart/Treatments/Calm/ACTION_CALM_NOT_IN_CART";
import ACTION_DECREMENT_COUNTER from "../../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import ACTION_SELECTED_DAY_RESET from "../../../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";
import "../../CartCard.css";

const CalmCard = (props) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(ACTION_CALM_NOT_IN_CART());
    dispatch(ACTION_DECREMENT_COUNTER());
    dispatch(ACTION_SELECTED_DAY_RESET());
    dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());

    props.resetAllCartStates();
  };
  return (
    <div className="shopping_cart_card_wrapping">
      <div className="shopping_cart_card_image_circle">
        <svg width="100%" height="12rem" viewBox="0 0 56.356 56.356">
          <circle cx="28" cy="28" r="22" fill="rgb(241, 241, 241)" />
          <g
            id="layer1"
            transform="translate(14.5 -102)"
            strokeMiterlimit="4"
            fill="rgba(186, 225, 253, 0.7)"
          >
            <path
              className="calm_icon_path"
              d="M71.967 97.24v-2.91c0-.089.021-.18 0-.265-.068-.271-.265-.515-.265-.794 0-.197.303-.336.265-.53-.063-.311-.411-.498-.53-.793-.504-1.26.853.353-.264-1.323-.208-.311-.601-.473-.794-.794-.09-.151.043-.358 0-.529-.048-.191-.217-.338-.264-.53-.043-.17.078-.37 0-.528-.862-1.723-.266.527-.794-1.059-.265-.793.529.53 0-.793-.118-.296-.339-.54-.53-.794-.074-.1-.264-.14-.264-.265 0-.197.327-.342.265-.529-.063-.187-.467-.077-.53-.264-.062-.188.203-.342.265-.53.057-.17 0-1.034 0-1.323V80.306c0-.088-.049-.191 0-.264.138-.208.39-.322.53-.53.048-.073-.029-.18 0-.264.062-.187.154-.365.264-.53.069-.103.225-.146.264-.264.056-.167-.097-.382 0-.529.11-.164.39-.125.53-.265.139-.139.155-.365.264-.529.808-1.212-.43 1.125.53-.794.088-.176.088-.44.264-.529.111-.055.176.353.264.265.198-.197.11-.562.265-.794.049-.073.202.063.265 0 .14-.14.125-.39.264-.529.063-.062.265-.088.265 0s-.304.079-.265 0c.112-.223.353-.353.53-.53l-.265.265c.176-.176.292-.45.529-.529.118-.04.265.14.265.265 0 .088-.304.079-.265 0 .112-.223.353-.353.53-.53.087-.088-.265.14-.265.265 0 .088.176 0 .264 0h.265c.088 0 .264-.088.264 0s-.327.063-.264 0c.14-.14.365-.155.529-.264.104-.07.14-.265.264-.265.125 0 .147.225.265.265.167.055.353 0 .53 0 .176 0 .404.124.528 0 .125-.125-.167-.474 0-.53.265-.088.524.197.794.265.13.033 1.26.031 1.323 0 .223-.111.293-.45.53-.53.118-.039.146.226.264.265a.858.858 0 00.529 0c.118-.039.144-.234.265-.264.256-.064.534.052.793 0 .194-.039.338-.217.53-.265.17-.042.358.043.529 0 .191-.047.338-.216.529-.264.009-.002.792.001.794 0 .139-.14.073-.482.264-.53.27-.067.52.32.794.265.245-.049.287-.469.53-.529.19-.048.337.312.528.265.242-.06.306-.418.53-.53.157-.078.352 0 .529 0 .088 0 .19.05.264 0 .208-.138.293-.45.53-.529.118-.04.143.295.264.265.308-.077.498-.411.794-.53.163-.065.356.035.529 0 .273-.054.523-.196.794-.264.085-.021.18.028.264 0 .187-.062.342-.202.53-.265.083-.027.19.05.264 0 .207-.138.292-.45.53-.529.117-.04.139.265.264.265.197 0 .338-.217.529-.265.342-.085.723.112 1.058 0 .118-.04.153-.208.265-.264.071-.036 1.473 0 1.587 0h-.264.529c.088 0 .264-.088.264 0s-.352 0-.264 0h.529c.088 0-.327-.063-.265 0 .14.14.39.125.53.264.139.14.125.39.264.53.14.139.365.155.53.264.103.07.176.176.264.265.088.088.264.14.264.264 0 .197-.176.353-.264.53.176.264.452.485.53.793.03.121-.29.142-.266.265.078.387.494.665.53 1.058.056.621-.317 1.23-.265 1.852 1.074 2.685.265-.037.265 2.646 0 .364.204.7.264 1.058.03.174 0 .353 0 .53v1.322c0 .53.087 1.066 0 1.588-.02.123-.244.141-.264.264-.073.435.14.905 0 1.323-.14.419-.63.65-.794 1.059-.046.116.31.149.264.264-.163.41-.596.664-.793 1.059-.706 1.41 1.171-.592-.265 1.323-.39.519-.404.01-.794.529-.19.254-.387.51-.529.793-.04.08.063.203 0 .265-.225.225-.545.33-.794.53-.194.155-.33.379-.529.528-.157.119-.39.126-.529.265-.14.14-.088.441-.264.53-.237.117-.558-.12-.794 0-.177.087-.107.41-.265.528-.223.168-.57.098-.794.265-.157.118-.1.42-.264.53-.147.097-.365-.066-.53 0-.59.235-1.018.773-1.587 1.057-.25.125-.554.122-.794.265-.213.128-.352.353-.529.53-.264.087-.544.139-.793.264-.112.056-.143.24-.265.264-.346.07-.724-.111-1.058 0-.237.08-.353.353-.53.53-.088.088-.143.234-.264.264-.257.064-.53 0-.794 0-.176 0-.371-.079-.529 0-.223.112-.287.469-.53.53-.19.047-.341-.328-.528-.265-.187.062-.074.481-.265.529-.27.067-.52-.21-.794-.265a1.22 1.22 0 00-.529 0c-.191.048-.342.202-.529.265-.084.028-.176 0-.265 0-.44 0-.89-.087-1.323 0-.193.039-.331.264-.529.264-.279 0-.523-.197-.793-.264-.086-.022-.177 0-.265 0-.176 0-.356-.035-.53 0-.273.055-.522.197-.793.264-.085.022-.176 0-.265 0h-1.587c-.088 0 .343-.039.265 0-.425.213-.882.353-1.323.53z"
              id="path842"
              paintOrder="normal"
              strokeLinejoin="bevel"
              strokeLinecap="round"
              strokeWidth="1"
              stroke="none"
            />
            <path
              className="calm_icon_path"
              d="M17.46 294.508c-.978-.316-1.829-1.092-2.267-2.069-.62-1.382-.212-3.174.932-4.087.288-.23 1.199-.739 2.025-1.13 1.133-.538 1.453-.74 1.304-.823-.108-.06-1.713-.764-3.565-1.563-1.853-.799-3.639-1.588-3.968-1.753-1.403-.705-2.342-2.195-2.34-3.716 0-.48.06-1.087.134-1.35.13-.469.123-.487-.394-.927-.615-.524-1.115-1.504-1.116-2.19-.003-1.12.172-1.383 2.455-3.688 2.394-2.415 3.133-3.282 4.164-4.88l1.49-2.317c2.208-3.44 5.97-5.898 10.156-6.635 1.188-.21 3.781-.208 5.004.003 3.08.531 6.059 2.067 8.245 4.252.997.997 1.664 1.886 2.712 3.617 1.306 2.157 2.193 3.252 4.677 5.773 2.465 2.502 2.634 2.75 2.631 3.874-.002.687-.501 1.667-1.117 2.191-.516.44-.524.458-.393.927.074.263.134.877.134 1.364 0 .767-.059 1.005-.444 1.772-.469.932-1.055 1.512-2.015 1.993-.287.144-2.022.906-3.855 1.694-1.834.788-3.43 1.486-3.545 1.55-.168.094.106.271 1.335.864 1.9.916 2.4 1.305 2.848 2.217.848 1.725.113 3.878-1.642 4.811-.39.208-.723.267-1.507.27l-1.006.003-4.78-2.047-4.78-2.047-4.772 2.044c-4.396 1.883-4.836 2.046-5.598 2.074-.455.016-.969-.016-1.141-.072zm3.505-22.016v-5.319l-.766 1.18c-1.406 2.166-3.454 4.457-5.363 6-.395.32-.507.472-.376.512.103.032.44.123.75.202.31.08 1.689.728 3.065 1.441 1.376.714 2.544 1.298 2.596 1.3.052.002.094-2.39.094-5.316zm18.683 4.021c1.388-.713 2.856-1.392 3.264-1.509l.74-.211-.553-.447c-.978-.79-2.87-2.67-3.652-3.632a32.858 32.858 0 01-1.615-2.234l-.853-1.3v5.315c0 2.924.033 5.316.073 5.316.04 0 1.208-.584 2.596-1.298zm-12.457-21.602c-.95-.303-1.836-.882-2.565-1.678-3.14-3.429-1.194-8.889 3.45-9.681 2.899-.495 5.827 1.427 6.584 4.322.778 2.971-.99 6.127-3.948 7.042-.99.307-2.547.305-3.521-.006z"
              id="path829"
              strokeWidth="1"
              stroke="#000"
            />
          </g>
        </svg>
      </div>
      <div className="shopping_cart_card_description">
        <div className="cart_card_top_container">
          <h3>Pulizia viso</h3>
          <p className="shopping_cart_duration">Durata: 1 ora</p>
        </div>
        <div className="cart_card_bottom_container">
          <div className="shopping_cart_price_container">
            <p className="shopping_cart_price">40€</p>
          </div>
          <div className="shopping_cart_remove_button" onClick={handleRemove}>
            <p>Rimuovi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalmCard;
